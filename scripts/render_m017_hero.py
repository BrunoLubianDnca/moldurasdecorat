"""Render the same M017 master mesh used by the browser viewer.

This is a deterministic orthographic studio preview for the catalog hero. It
deliberately uses the negative-Z decorative side of the mesh; the former
preview looked at the back and therefore read as a grey slab.
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import trimesh


ROOT = Path(__file__).resolve().parents[1]
MODEL = ROOT / "public/catalogo/modelos/M017.glb"
OUT = ROOT / "public/catalogo/produtos/M017.webp"
OUT_PNG = ROOT / "public/catalogo/produtos/M017_hero.png"


def render() -> None:
    scene = trimesh.load(MODEL)
    mesh = next(iter(scene.geometry.values())) if isinstance(scene, trimesh.Scene) else scene
    mesh = mesh.copy()
    mesh.remove_unreferenced_vertices()

    width = height = 1600
    image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)

    camera = np.array([-820.0, 260.0, -500.0])
    target = np.array([0.0, 0.0, 0.0])
    direction = target - camera
    direction /= np.linalg.norm(direction)
    up_world = np.array([0.0, 1.0, 0.0])
    right = np.cross(direction, up_world)
    right /= np.linalg.norm(right)
    up = np.cross(right, direction)
    up /= np.linalg.norm(up)

    vertices = mesh.vertices.astype(np.float64)
    screen_x = vertices @ right
    screen_y = vertices @ up
    depth = vertices @ direction
    sx_min, sx_max = screen_x.min(), screen_x.max()
    sy_min, sy_max = screen_y.min(), screen_y.max()
    scale = min((width - 220) / (sx_max - sx_min), (height - 260) / (sy_max - sy_min))
    center_x, center_y = (sx_min + sx_max) / 2, (sy_min + sy_max) / 2
    px = (screen_x - center_x) * scale + width / 2
    py = height / 2 - (screen_y - center_y) * scale + 35

    shadow_draw.ellipse((260, 1230, 1360, 1390), fill=(47, 39, 29, 72))
    shadow = shadow.filter(ImageFilter.GaussianBlur(30))
    image.alpha_composite(shadow)

    light = np.array([-0.55, 0.8, -0.75])
    light /= np.linalg.norm(light)
    fill = np.array([0.7, 0.2, 0.65])
    fill /= np.linalg.norm(fill)
    face_normals = mesh.face_normals
    faces = []
    for index, face in enumerate(mesh.faces):
        normal = face_normals[index]
        visibility = np.dot(normal, direction)
        if visibility <= -0.035:
            continue
        light_value = 0.72 + max(0.0, np.dot(normal, light)) * 0.22 + max(0.0, np.dot(normal, fill)) * 0.08
        light_value = min(1.0, max(0.52, light_value))
        base = np.array([250.0, 247.0, 241.0]) * light_value
        color = tuple(int(value) for value in base) + (255,)
        polygon = [(float(px[item]), float(py[item])) for item in face]
        faces.append((float(depth[face].mean()), polygon, color))

    faces.sort(key=lambda item: item[0])
    draw = ImageDraw.Draw(image)
    for _, polygon, color in faces:
        draw.polygon(polygon, fill=color)

    image = image.resize((800, 800), Image.Resampling.LANCZOS)
    image.save(OUT_PNG)
    image.save(OUT, "WEBP", quality=96, method=6)
    print(f"Wrote {OUT_PNG.name} and {OUT.name}")


if __name__ == "__main__":
    render()
