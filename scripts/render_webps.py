import os
import math
import numpy as np
from PIL import Image, ImageDraw
import trimesh

in_dir = r"C:\Users\Lubian\Dani\moldurasdecorat\public\catalogo\modelos"
out_dir = r"C:\Users\Lubian\Dani\moldurasdecorat\public\catalogo\produtos"
os.makedirs(out_dir, exist_ok=True)

models = [f for f in os.listdir(in_dir) if f.endswith('.glb')]

def render_model(filename):
    code = filename.replace('.glb', '')
    path = os.path.join(in_dir, filename)
    mesh = trimesh.load(path)
    if isinstance(mesh, trimesh.Scene):
        mesh = list(mesh.geometry.values())[0]
    
    # Render settings
    SIZE = 1000
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    verts = mesh.vertices.copy()
    faces = mesh.faces
    
    # 3/4 Isometric Camera Rotation
    rad_y = math.radians(-45.0)
    rad_x = math.radians(35.264)
    
    Ry = np.array([[math.cos(rad_y), 0, math.sin(rad_y)], [0, 1, 0], [-math.sin(rad_y), 0, math.cos(rad_y)]])
    Rx = np.array([[1, 0, 0], [0, math.cos(rad_x), -math.sin(rad_x)], [0, math.sin(rad_x), math.cos(rad_x)]])
    
    R = Rx @ Ry
    rot_verts = verts @ R.T
    
    # Normal vector for each face (recalculate since it's rotated)
    # Actually trimesh faces are oriented.
    rot_normals = mesh.face_normals @ R.T
    
    min_v = rot_verts[:, :2].min(axis=0)
    max_v = rot_verts[:, :2].max(axis=0)
    
    margin = 150
    scale = min((SIZE - margin * 2) / (max_v[0] - min_v[0]), (SIZE - margin * 2) / (max_v[1] - min_v[1]))
    proj_verts = (rot_verts[:, :2] - (min_v + max_v) / 2) * scale + [SIZE / 2, SIZE / 2]
    
    # Option A Lighting:
    # Key light
    key_dir = np.array([0.5, 0.8, 0.5])
    key_dir = key_dir / np.linalg.norm(key_dir)
    
    faces_data = []
    for i, face in enumerate(faces):
        norm = rot_normals[i]
        if norm[2] < -0.01:
            continue # Backface cull
            
        avg_z = rot_verts[face, 2].mean()
        
        # Hemisphere Light imitation (sky is Y+, ground is Y-)
        # In our rotated space, global Y is R[1]
        global_up = R @ np.array([0, 1, 0])
        hemi_weight = np.dot(norm, global_up) * 0.5 + 0.5
        hemi_intensity = hemi_weight * 1.0 + (1 - hemi_weight) * 0.3
        
        # Key Light (Directional)
        dot_key = max(0, np.dot(norm, key_dir))
        key_intensity = dot_key * 0.8
        
        ambient = 0.2
        total_light = ambient + hemi_intensity * 0.5 + key_intensity * 0.7
        total_light = min(1.0, max(0.2, total_light))
        
        r = int(245 * total_light)
        g = int(243 * total_light)
        b = int(238 * total_light)
        
        # Soften edges by not drawing an outline, or a very light one
        edge_col = (r, g, b, 255)
        
        poly_2d = [(proj_verts[idx, 0], proj_verts[idx, 1]) for idx in face]
        faces_data.append((avg_z, poly_2d, (r, g, b, 255), edge_col))
        
    faces_data.sort(key=lambda item: item[0])
    
    for _, poly_2d, fill_col, edge_col in faces_data:
        draw.polygon(poly_2d, fill=fill_col, outline=edge_col)
        
    final_img = img.resize((500, 500), Image.Resampling.LANCZOS)
    webp_path = os.path.join(out_dir, f"{code}.webp")
    final_img.save(webp_path, "WEBP", quality=95)

for i, m in enumerate(models):
    render_model(m)
    if (i+1) % 10 == 0:
        print(f"Rendered {i+1}/{len(models)}")
print("All renders completed.")
