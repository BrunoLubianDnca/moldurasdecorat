import os
import cv2
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import trimesh
from shapely.geometry import Polygon

folder = r"C:\Users\Lubian\Dani\Downloads\Catalogo_Decorat_114_Modelos_Individuais\modelos"
out_dir = r"C:\Users\Lubian\Dani\moldurasdecorat\public\catalogo"

def extract_profile(code):
    path = os.path.join(folder, f"{code}.jpg")
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)
    cnts, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    cnts = [c for c in cnts if cv2.contourArea(c) > 300]
    cnts = sorted(cnts, key=lambda c: cv2.boundingRect(c)[0])
    profile_cnt = cnts[-1] if len(cnts) >= 2 else cnts[0]
    
    pts = profile_cnt.reshape(-1, 2).astype(np.float32)
    
    # Slight Ramer-Douglas-Peucker smoothing with tiny epsilon (0.8px) to eliminate pixel staircase while keeping 100% curve detail
    epsilon = 0.8
    approx = cv2.approxPolyDP(pts, epsilon, True)
    pts = approx.reshape(-1, 2)
    
    min_x, min_y = pts.min(axis=0)
    max_x, max_y = pts.max(axis=0)
    width = float(max_x - min_x)
    height = float(max_y - min_y)
    
    norm_pts = pts - [min_x, min_y]
    norm_pts[:, 1] = height - norm_pts[:, 1] # Flip Y for 3D space
    
    return norm_pts, int(width), int(height)

def render_studio_3d(code):
    pts, width, height = extract_profile(code)
    
    # 1. Build SVG Profile
    path_str = f"M {pts[0][0]:.1f} {pts[0][1]:.1f} " + " ".join([f"L {p[0]:.1f} {p[1]:.1f}" for p in pts[1:]]) + " Z"
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <path d="{path_str}" fill="#0d4058" stroke="#f7941d" stroke-width="1.5" stroke-linejoin="round" />
</svg>'''
    with open(os.path.join(out_dir, "perfis", f"{code}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
        
    # 2. Build 3D GLB
    poly_pts = [(p[0], p[1]) for p in pts]
    poly = Polygon(poly_pts)
    if not poly.is_valid:
        poly = poly.buffer(0)
    if poly.geom_type == 'MultiPolygon':
        poly = max(poly.geoms, key=lambda g: g.area)
        
    length = max(400, int(height * 2.8))
    mesh = trimesh.creation.extrude_polygon(poly, height=length)
    
    # Material: Off-white architectural EPS
    mesh.visual.face_colors = [246, 245, 242, 255]
    mesh.export(os.path.join(out_dir, "modelos", f"{code}.glb"))
    
    # 3. Studio High-Resolution Render (800x800 super-sampled to 400x400 WebP)
    render_size = 1000
    img = Image.new("RGBA", (render_size, render_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    verts = mesh.vertices.copy()
    center = verts.mean(axis=0)
    verts -= center
    
    # Rotate 3/4 architectural orientation:
    # Decorative front face towards camera, showing front cross section cut + long decorative profile extending back right
    rot_y_deg = -35.0
    rot_x_deg = 25.0
    rot_z_deg = -10.0
    
    rad_y = math.radians(rot_y_deg)
    rad_x = math.radians(rot_x_deg)
    rad_z = math.radians(rot_z_deg)
    
    Ry = np.array([[math.cos(rad_y), 0, math.sin(rad_y)], [0, 1, 0], [-math.sin(rad_y), 0, math.cos(rad_y)]])
    Rx = np.array([[1, 0, 0], [0, math.cos(rad_x), -math.sin(rad_x)], [0, math.sin(rad_x), math.cos(rad_x)]])
    Rz = np.array([[math.cos(rad_z), -math.sin(rad_z), 0], [math.sin(rad_z), math.cos(rad_z), 0], [0, 0, 1]])
    
    R = Rz @ Rx @ Ry
    rot_verts = verts @ R.T
    rot_normals = mesh.face_normals @ R.T
    
    # Fit into canvas
    min_v = rot_verts[:, :2].min(axis=0)
    max_v = rot_verts[:, :2].max(axis=0)
    
    scale = min((render_size - 180) / (max_v[0] - min_v[0]), (render_size - 180) / (max_v[1] - min_v[1]))
    proj_verts = (rot_verts[:, :2] - (min_v + max_v) / 2) * scale + [render_size / 2, render_size / 2]
    
    # Lights
    key_light = np.array([0.5, 0.8, 0.8])
    key_light = key_light / np.linalg.norm(key_light)
    
    fill_light = np.array([-0.6, -0.2, 0.5])
    fill_light = fill_light / np.linalg.norm(fill_light)
    
    faces_data = []
    for i, face in enumerate(mesh.faces):
        norm = rot_normals[i]
        if norm[2] < -0.01:
            continue # Backface culling
            
        avg_z = rot_verts[face, 2].mean()
        
        # Studio Shading (Key + Fill + Ambient + EPS matte texture warmth)
        key_intensity = max(0.0, np.dot(norm, key_light))
        fill_intensity = max(0.0, np.dot(norm, fill_light))
        
        ambient = 0.55
        light_sum = ambient + key_intensity * 0.45 + fill_intensity * 0.15
        light_sum = min(1.0, light_sum)
        
        # Off-white EPS tone RGB
        r = int(248 * light_sum)
        g = int(246 * light_sum)
        b = int(242 * light_sum)
        
        # Subtle stroke color for crisp architectural edge definition
        edge_r = int(r * 0.82)
        edge_g = int(g * 0.82)
        edge_b = int(b * 0.82)
        
        poly_2d = [(proj_verts[idx, 0], proj_verts[idx, 1]) for idx in face]
        faces_data.append((avg_z, poly_2d, (r, g, b, 255), (edge_r, edge_g, edge_b, 180)))
        
    # Sort back-to-front (Painter's Algorithm)
    faces_data.sort(key=lambda item: item[0])
    
    for _, poly_2d, color, edge_color in faces_data:
        draw.polygon(poly_2d, fill=color, outline=edge_color)
        
    # Downsample with Lanczos for super-sampled anti-aliased WebP image
    final_img = img.resize((450, 450), Image.Resampling.LANCZOS)
    webp_path = os.path.join(out_dir, "produtos", f"{code}.webp")
    final_img.save(webp_path, "WEBP", quality=95)
    print(f"Generated studio render for {code}: {width}x{height}mm")

for code in ['M001', 'M002', 'M008']:
    render_studio_3d(code)
