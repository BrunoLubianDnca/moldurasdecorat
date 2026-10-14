import os
import cv2
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import trimesh
from shapely.geometry import Polygon
from scipy.interpolate import splprep, splev

folder = r"C:\Users\Lubian\Dani\Downloads\Catalogo_Decorat_114_Modelos_Individuais\modelos"
out_dir = r"C:\Users\Lubian\Dani\moldurasdecorat\public\catalogo"

def extract_smooth_profile(code):
    path = os.path.join(folder, f"{code}.jpg")
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)
    cnts, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    cnts = [c for c in cnts if cv2.contourArea(c) > 300]
    cnts = sorted(cnts, key=lambda c: cv2.boundingRect(c)[0])
    profile_cnt = cnts[-1] if len(cnts) >= 2 else cnts[0]
    
    pts = profile_cnt.reshape(-1, 2).astype(np.float32)
    
    # 1. Clean small noise pixels with RDP (0.7px)
    epsilon = 0.7
    approx = cv2.approxPolyDP(pts, epsilon, True)
    pts = approx.reshape(-1, 2).astype(np.float32)
    
    # 2. Resample points along perimeter to ensure smooth curvature
    N = len(pts)
    if N > 12:
        # Interpolate points along curve
        t = np.linspace(0, 1, N)
        t_fine = np.linspace(0, 1, N * 2)
        try:
            tck, u = splprep([pts[:, 0], pts[:, 1]], s=1.5, per=True)
            x_fine, y_fine = splev(t_fine, tck)
            pts = np.vstack([x_fine, y_fine]).T
        except Exception:
            pass
            
    min_x, min_y = pts.min(axis=0)
    max_x, max_y = pts.max(axis=0)
    width = float(max_x - min_x)
    height = float(max_y - min_y)
    
    norm_pts = pts - [min_x, min_y]
    norm_pts[:, 1] = height - norm_pts[:, 1] # Flip Y
    
    return norm_pts, int(width), int(height)

def render_premium_architectural_3d(code):
    pts, width, height = extract_smooth_profile(code)
    
    # 1. Export Clean SVG Profile
    path_str = f"M {pts[0][0]:.2f} {pts[0][1]:.2f} " + " ".join([f"L {p[0]:.2f} {p[1]:.2f}" for p in pts[1:]]) + " Z"
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <path d="{path_str}" fill="#0d4058" stroke="#f7941d" stroke-width="1.5" stroke-linejoin="round" />
</svg>'''
    with open(os.path.join(out_dir, "perfis", f"{code}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
        
    # 2. Build 3D Extrusion Mesh
    poly_pts = [(p[0], p[1]) for p in pts]
    poly = Polygon(poly_pts)
    if not poly.is_valid:
        poly = poly.buffer(0)
    if poly.geom_type == 'MultiPolygon':
        poly = max(poly.geoms, key=lambda g: g.area)
        
    extrusion_length = max(450, int(height * 3.2))
    mesh = trimesh.creation.extrude_polygon(poly, height=extrusion_length)
    mesh.visual.face_colors = [250, 249, 246, 255]
    mesh.export(os.path.join(out_dir, "modelos", f"{code}.glb"))
    
    # 3. Super-sampled High-End Studio Render (1600x1600 -> 500x500)
    SIZE = 1600
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    verts = mesh.vertices.copy()
    center = verts.mean(axis=0)
    verts -= center
    
    # 3/4 Isometric Camera Rotation:
    # Rotate Y=-38 deg, X=28 deg, Z=-12 deg
    rad_y = math.radians(-38.0)
    rad_x = math.radians(28.0)
    rad_z = math.radians(-12.0)
    
    Ry = np.array([[math.cos(rad_y), 0, math.sin(rad_y)], [0, 1, 0], [-math.sin(rad_y), 0, math.cos(rad_y)]])
    Rx = np.array([[1, 0, 0], [0, math.cos(rad_x), -math.sin(rad_x)], [0, math.sin(rad_x), math.cos(rad_x)]])
    Rz = np.array([[math.cos(rad_z), -math.sin(rad_z), 0], [math.sin(rad_z), math.cos(rad_z), 0], [0, 0, 1]])
    
    R = Rz @ Rx @ Ry
    rot_verts = verts @ R.T
    rot_normals = mesh.face_normals @ R.T
    
    # Viewport projection
    min_v = rot_verts[:, :2].min(axis=0)
    max_v = rot_verts[:, :2].max(axis=0)
    
    margin = 220
    scale = min((SIZE - margin * 2) / (max_v[0] - min_v[0]), (SIZE - margin * 2) / (max_v[1] - min_v[1]))
    proj_verts = (rot_verts[:, :2] - (min_v + max_v) / 2) * scale + [SIZE / 2, SIZE / 2]
    
    # Studio Studio Lighting
    # Key Light (Top-Left-Front)
    key_dir = np.array([0.65, 0.75, 0.7])
    key_dir = key_dir / np.linalg.norm(key_dir)
    
    # Fill Light (Bottom-Right-Front)
    fill_dir = np.array([-0.5, -0.3, 0.6])
    fill_dir = fill_dir / np.linalg.norm(fill_dir)
    
    # Rim Light (Top-Right-Back)
    rim_dir = np.array([-0.4, 0.8, -0.6])
    rim_dir = rim_dir / np.linalg.norm(rim_dir)
    
    faces_data = []
    for i, face in enumerate(mesh.faces):
        norm = rot_normals[i]
        if norm[2] < -0.01:
            continue # Backface cull
            
        avg_z = rot_verts[face, 2].mean()
        
        # Smooth Half-Lambert Shading
        dot_key = np.dot(norm, key_dir)
        half_lambert_key = (dot_key * 0.5 + 0.5) ** 1.8
        
        dot_fill = np.dot(norm, fill_dir)
        half_lambert_fill = (dot_fill * 0.5 + 0.5) ** 1.2
        
        dot_rim = np.dot(norm, rim_dir)
        rim_intensity = max(0.0, dot_rim) ** 3.0
        
        # Combine lighting components
        ambient = 0.45
        total_light = ambient + half_lambert_key * 0.42 + half_lambert_fill * 0.12 + rim_intensity * 0.15
        total_light = min(1.0, max(0.2, total_light))
        
        # Architectural Off-White Material Tone (Velvety Plaster/EPS)
        r = int(252 * total_light)
        g = int(250 * total_light)
        b = int(246 * total_light)
        
        # Subtle crisp edge contour
        edge_r = int(r * 0.84)
        edge_g = int(g * 0.84)
        edge_b = int(b * 0.84)
        
        poly_2d = [(proj_verts[idx, 0], proj_verts[idx, 1]) for idx in face]
        faces_data.append((avg_z, poly_2d, (r, g, b, 255), (edge_r, edge_g, edge_b, 160)))
        
    # Painter's Algorithm Sort
    faces_data.sort(key=lambda item: item[0])
    
    for _, poly_2d, fill_col, edge_col in faces_data:
        draw.polygon(poly_2d, fill=fill_col, outline=edge_col)
        
    # High-quality anti-aliased downsampling
    final_img = img.resize((500, 500), Image.Resampling.LANCZOS)
    webp_path = os.path.join(out_dir, "produtos", f"{code}.webp")
    final_img.save(webp_path, "WEBP", quality=95)
    print(f"Rendered premium 3D model for {code}: {width}x{height}mm")

for code in ['M001', 'M002', 'M008']:
    render_premium_architectural_3d(code)
