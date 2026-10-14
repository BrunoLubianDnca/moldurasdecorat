import os
import cv2
import json
import math
import numpy as np
from PIL import Image, ImageDraw
import trimesh
from shapely.geometry import Polygon

base_dir = r"C:\Users\Lubian\Dani\moldurasdecorat"
output_dir = os.path.join(base_dir, "public", "catalogo")
models_dir = r"C:\Users\Lubian\Dani\Downloads\Catalogo_Decorat_114_Modelos_Individuais\modelos"

os.makedirs(os.path.join(output_dir, "produtos"), exist_ok=True)
os.makedirs(os.path.join(output_dir, "perfis"), exist_ok=True)
os.makedirs(os.path.join(output_dir, "modelos"), exist_ok=True)
os.makedirs(os.path.join(output_dir, "originais"), exist_ok=True)
os.makedirs(os.path.join(base_dir, "src", "data"), exist_ok=True)

def process_model(code):
    jpg_path = os.path.join(models_dir, f"{code}.jpg")
    if not os.path.exists(jpg_path):
        return None
        
    webp_path = os.path.join(output_dir, "produtos", f"{code}.webp")
    svg_path = os.path.join(output_dir, "perfis", f"{code}.svg")
    glb_path = os.path.join(output_dir, "modelos", f"{code}.glb")
    
    img = cv2.imread(jpg_path)
    h, w, _ = img.shape
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)
    cnts, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = [c for c in cnts if cv2.contourArea(c) > 300]
    cnts = sorted(cnts, key=lambda c: cv2.boundingRect(c)[0])
    profile_cnt = cnts[-1] if len(cnts) >= 2 else cnts[0]
    
    epsilon = 0.004 * cv2.arcLength(profile_cnt, True)
    approx = cv2.approxPolyDP(profile_cnt, epsilon, True)
    pts = approx.reshape(-1, 2)
    min_x, min_y = pts.min(axis=0)
    max_x, max_y = pts.max(axis=0)
    width = int(max_x - min_x)
    height = int(max_y - min_y)
    
    if os.path.exists(webp_path) and os.path.exists(svg_path) and os.path.exists(glb_path):
        return {
            "codigo": code,
            "nome": f"Moldura {code}",
            "categoria": "Moldura Arquitetônica",
            "altura_mm": height,
            "largura_mm": width,
            "imagem": f"/catalogo/produtos/{code}.webp",
            "perfil": f"/catalogo/perfis/{code}.svg",
            "modelo3d": f"/catalogo/modelos/{code}.glb",
            "status_validacao": "validado" if code in ["M001", "M002", "M005"] else "pendente"
        }
    
    # Save original copy
    cv2.imwrite(os.path.join(output_dir, "originais", f"{code}.jpg"), img)
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)
    
    cnts, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = [c for c in cnts if cv2.contourArea(c) > 300]
    
    if not cnts:
        return None
        
    cnts = sorted(cnts, key=lambda c: cv2.boundingRect(c)[0])
    profile_cnt = cnts[-1] if len(cnts) >= 2 else cnts[0]
    
    # Simplify contour slightly for clean vector profile
    epsilon = 0.004 * cv2.arcLength(profile_cnt, True)
    approx = cv2.approxPolyDP(profile_cnt, epsilon, True)
    pts = approx.reshape(-1, 2)
    
    min_x, min_y = pts.min(axis=0)
    max_x, max_y = pts.max(axis=0)
    width = int(max_x - min_x)
    height = int(max_y - min_y)
    
    norm_pts = pts - [min_x, min_y]
    # Flip Y axis for SVG standard coordinate space
    norm_pts[:, 1] = height - norm_pts[:, 1]
    
    # 1. Generate SVG profile
    path_str = f"M {norm_pts[0][0]} {norm_pts[0][1]} " + " ".join([f"L {p[0]} {p[1]}" for p in norm_pts[1:]]) + " Z"
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <path d="{path_str}" fill="#0d4058" stroke="#f7941d" stroke-width="2" stroke-linejoin="round" />
</svg>'''
    
    svg_path = os.path.join(output_dir, "perfis", f"{code}.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
        
    # 2. Build 3D GLB extrusion
    poly_pts = [(p[0], p[1]) for p in norm_pts]
    poly = Polygon(poly_pts)
    if not poly.is_valid:
        poly = poly.buffer(0)
    if poly.geom_type == 'MultiPolygon':
        poly = max(poly.geoms, key=lambda g: g.area)
        
    extrusion_length = max(350, int(height * 2.8))
    mesh = trimesh.creation.extrude_polygon(poly, height=extrusion_length)
    mesh.visual.face_colors = [245, 245, 242, 255]
    
    glb_path = os.path.join(output_dir, "modelos", f"{code}.glb")
    mesh.export(glb_path)
    
    # 3. Render 3D preview WebP image using software rasterization / Pillow projection
    # Create high-res software rendered 3D preview with isometric projection & shading
    img_w, img_h = 600, 600
    render_img = Image.new("RGBA", (img_w, img_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(render_img)
    
    # Isometric transformation angles (30 deg pitch, 45 deg yaw)
    angle_x = math.radians(30)
    angle_y = math.radians(45)
    
    # Transform 3D mesh vertices to 2D isometric projection
    vertices = mesh.vertices.copy()
    # Center mesh around origin
    center = vertices.mean(axis=0)
    vertices -= center
    
    # Rotate around Y then X
    cos_y, sin_y = math.cos(angle_y), math.sin(angle_y)
    cos_x, sin_x = math.cos(angle_x), math.sin(angle_x)
    
    rot_y = np.array([
        [cos_y, 0, sin_y],
        [0, 1, 0],
        [-sin_y, 0, cos_y]
    ])
    rot_x = np.array([
        [1, 0, 0],
        [0, cos_x, -sin_x],
        [0, sin_x, cos_x]
    ])
    
    rot_verts = vertices @ rot_y.T @ rot_x.T
    
    # Fit into viewport
    min_v = rot_verts[:, :2].min(axis=0)
    max_v = rot_verts[:, :2].max(axis=0)
    scale = min((img_w - 120) / (max_v[0] - min_v[0]), (img_h - 120) / (max_v[1] - min_v[1]))
    
    proj_verts = (rot_verts[:, :2] - (min_v + max_v) / 2) * scale + [img_w / 2, img_h / 2]
    
    # Directional light vector
    light_dir = np.array([0.4, 0.7, 0.6])
    light_dir = light_dir / np.linalg.norm(light_dir)
    
    # Collect faces with depth and shading
    faces_data = []
    normals = mesh.face_normals @ rot_y.T @ rot_x.T
    
    for i, face in enumerate(mesh.faces):
        norm = normals[i]
        # Skip back-facing polygons
        if norm[2] < -0.01:
            continue
        
        avg_z = rot_verts[face, 2].mean()
        # Flat diffuse lighting + ambient
        intensity = max(0.2, np.dot(norm, light_dir))
        color_val = int(210 + 45 * intensity)
        color = (color_val, color_val - 2, color_val - 5, 255)
        
        pts_2d = [(proj_verts[idx, 0], proj_verts[idx, 1]) for idx in face]
        faces_data.append((avg_z, pts_2d, color))
        
    # Sort painter's algorithm (back to front)
    faces_data.sort(key=lambda item: item[0])
    
    for _, pts_2d, color in faces_data:
        draw.polygon(pts_2d, fill=color, outline=(180, 180, 185, 200))
        
    webp_path = os.path.join(output_dir, "produtos", f"{code}.webp")
    render_img.save(webp_path, "WEBP", quality=92)
    
    return {
        "codigo": code,
        "nome": f"Moldura {code}",
        "categoria": "Moldura Arquitetônica",
        "altura_mm": height,
        "largura_mm": width,
        "imagem": f"/catalogo/produtos/{code}.webp",
        "perfil": f"/catalogo/perfis/{code}.svg",
        "modelo3d": f"/catalogo/modelos/{code}.glb",
        "status_validacao": "validado" if code in ["M001", "M002", "M005"] else "pendente"
    }

if __name__ == "__main__":
    catalogo = []
    # Process all 114 models M001 to M114
    for i in range(1, 115):
        code = f"M{i:03d}"
        item = process_model(code)
        if item:
            catalogo.append(item)
            print(f"Processed: {code}")
            
    print(f"Total catalog items created: {len(catalogo)}")
    
    # Save both in src/data/catalogo.json and public/catalogo/catalogo.json
    out_src = os.path.join(base_dir, "src", "data", "catalogo.json")
    out_pub = os.path.join(output_dir, "catalogo.json")
    
    with open(out_src, "w", encoding="utf-8") as f:
        json.dump(catalogo, f, indent=2, ensure_ascii=False)
        
    with open(out_pub, "w", encoding="utf-8") as f:
        json.dump(catalogo, f, indent=2, ensure_ascii=False)

