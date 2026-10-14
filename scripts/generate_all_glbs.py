import os
import cv2
import numpy as np
import trimesh
from shapely.geometry import Polygon

folder = r"C:\Users\Lubian\Dani\Downloads\Catalogo_Decorat_114_Modelos_Individuais\modelos"
out_dir_glb = r"C:\Users\Lubian\Dani\moldurasdecorat\public\catalogo\modelos"
out_dir_svg = r"C:\Users\Lubian\Dani\moldurasdecorat\public\catalogo\perfis"

os.makedirs(out_dir_glb, exist_ok=True)
os.makedirs(out_dir_svg, exist_ok=True)

models = [f.split('.')[0] for f in os.listdir(folder) if f.endswith('.jpg') and f.startswith('M')]

def process_model(code):
    path = os.path.join(folder, f"{code}.jpg")
    img = cv2.imread(path)
    if img is None: return
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)
    cnts, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    cnts = [c for c in cnts if cv2.contourArea(c) > 300]
    if not cnts: return
    cnts = sorted(cnts, key=lambda c: cv2.boundingRect(c)[0])
    profile_cnt = cnts[-1] if len(cnts) >= 2 else cnts[0]

    pts = profile_cnt.reshape(-1, 2).astype(np.float32)

    # Sub-pixel smooth
    approx = cv2.approxPolyDP(pts, 0.2, True)
    pts = approx.reshape(-1, 2).astype(np.float32)

    min_x, min_y = pts.min(axis=0)
    max_x, max_y = pts.max(axis=0)
    width = float(max_x - min_x)
    height = float(max_y - min_y)

    norm_pts = pts - [min_x, min_y]
    norm_pts[:, 1] = height - norm_pts[:, 1] # Flip Y

    # Save SVG
    path_str = f"M {norm_pts[0][0]:.2f} {norm_pts[0][1]:.2f} " + " ".join([f"L {p[0]:.2f} {p[1]:.2f}" for p in norm_pts[1:]]) + " Z"
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <path d="{path_str}" fill="#0d4058" stroke="#f7941d" stroke-width="1.5" stroke-linejoin="round" />
</svg>'''
    with open(os.path.join(out_dir_svg, f"{code}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)

    # GLB Extrusion
    poly_pts = [(p[0], p[1]) for p in norm_pts]
    poly = Polygon(poly_pts)
    if not poly.is_valid:
        poly = poly.buffer(0)
    if poly.geom_type == 'MultiPolygon':
        poly = max(poly.geoms, key=lambda g: g.area)

    extrusion_length = max(450, int(height * 3.2))
    mesh = trimesh.creation.extrude_polygon(poly, height=extrusion_length)
    
    # Orient horizontally along X
    T = trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0])
    mesh.apply_transform(T)
    
    center = mesh.bounds.mean(axis=0)
    mesh.vertices -= center

    mesh.export(os.path.join(out_dir_glb, f"{code}.glb"))
    print(f"Processed GLB/SVG for {code}")

for m in models:
    process_model(m)
