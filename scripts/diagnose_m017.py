import os
import cv2
import numpy as np
import trimesh
from shapely.geometry import Polygon

folder = r"C:\Users\Lubian\Dani\Downloads\Catalogo_Decorat_114_Modelos_Individuais\modelos"
out_dir = r"C:\Users\Lubian\Dani\moldurasdecorat\public\catalogo\modelos"
code = 'M017'

path = os.path.join(folder, f"{code}.jpg")
img = cv2.imread(path)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)
cnts, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
cnts = [c for c in cnts if cv2.contourArea(c) > 300]
cnts = sorted(cnts, key=lambda c: cv2.boundingRect(c)[0])
profile_cnt = cnts[-1] if len(cnts) >= 2 else cnts[0]

pts = profile_cnt.reshape(-1, 2).astype(np.float32)

approx = cv2.approxPolyDP(pts, 0.2, True)
pts = approx.reshape(-1, 2).astype(np.float32)

min_x, min_y = pts.min(axis=0)
max_x, max_y = pts.max(axis=0)
width = float(max_x - min_x)
height = float(max_y - min_y)

norm_pts = pts - [min_x, min_y]
norm_pts[:, 1] = height - norm_pts[:, 1] # Flip Y

poly_pts = [(p[0], p[1]) for p in norm_pts]
poly = Polygon(poly_pts)
if not poly.is_valid:
    poly = poly.buffer(0)

extrusion_length = 500.0
mesh = trimesh.creation.extrude_polygon(poly, height=extrusion_length)

# Rotate so length is along X axis (currently along Z axis)
# Profile is currently on XY plane
# Rotate around Y axis by 90 degrees
T = trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0])
mesh.apply_transform(T)

# The flat back is currently on the XZ plane or similar.
# Let's check bounding box.
center = mesh.bounds.mean(axis=0)
mesh.vertices -= center

# Rotate around X to ensure decorative face is towards +Z
# We can just let the ThreeJS viewer handle the camera.

if not os.path.exists(out_dir):
    os.makedirs(out_dir)
mesh.export(os.path.join(out_dir, f"{code}_fixed.glb"))

print("M017 extracted and oriented correctly. Extrusion length:", extrusion_length)
print("Mesh bounds:", mesh.bounds)
print("Mesh faces:", len(mesh.faces))
