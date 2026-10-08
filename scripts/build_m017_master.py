"""Build the single approved M017 prototype from its cleaned technical profile.

The source profile is the existing catalog SVG generated from the M017 reference
sheet.  We only remove one-pixel rasterisation noise; the stepped contour itself
is intentionally kept straight and is never smoothed or subdivided.
"""

from __future__ import annotations

import re
from pathlib import Path

import trimesh
from shapely.geometry import Polygon


ROOT = Path(__file__).resolve().parents[1]
PROFILE_SVG = ROOT / "public/catalogo/perfis/M017.svg"
MODEL_OUT = ROOT / "public/catalogo/modelos/M017.glb"
MASTER_OUT = ROOT / "public/catalogo/modelos/M017_master_profile.json"


def read_profile() -> list[tuple[float, float]]:
    svg = PROFILE_SVG.read_text(encoding="utf-8")
    points = [(float(x), float(y)) for x, y in re.findall(r"[ML]\s+([0-9.]+)\s+([0-9.]+)", svg)]
    if len(points) < 8:
        raise ValueError("M017 profile SVG did not contain a usable polygon")

    # The original contour was sampled from a raster reference.  Removing only
    # 1-pixel zig-zags preserves the architectural steps and the measured
    # 61 x 171 envelope without inventing curves.
    polygon = Polygon(points).simplify(1.25, preserve_topology=True)
    if not polygon.is_valid:
        polygon = polygon.buffer(0)
    if polygon.geom_type == "MultiPolygon":
        polygon = max(polygon.geoms, key=lambda item: item.area)
    clean = [(round(x, 3), round(y, 3)) for x, y in list(polygon.exterior.coords)[:-1]]
    return clean


def main() -> None:
    points = read_profile()
    polygon = Polygon(points)
    width, height = polygon.bounds[2] - polygon.bounds[0], polygon.bounds[3] - polygon.bounds[1]

    # Keep the existing catalog proportion: a 547-unit longitudinal sample
    # for the 61 x 171 profile.  The web viewer treats the model as a product,
    # so these units are intentionally relative rather than claimed millimetres.
    extrusion_length = 547.0
    mesh = trimesh.creation.extrude_polygon(polygon, height=extrusion_length)
    # Extrusion starts along Z. Rotate so the moulding runs along X and its
    # decorative stepped face is at negative Z, matching the viewer camera.
    mesh.apply_transform(trimesh.transformations.rotation_matrix(1.57079632679, [0, 1, 0]))
    mesh.vertices -= mesh.bounds.mean(axis=0)
    mesh.update_faces(mesh.unique_faces())
    mesh.remove_unreferenced_vertices()
    mesh.fix_normals()
    mesh.visual.face_colors = [247, 244, 236, 255]

    MODEL_OUT.parent.mkdir(parents=True, exist_ok=True)
    mesh.export(MODEL_OUT)
    MASTER_OUT.write_text(
        "{\n"
        f'  "source": "{PROFILE_SVG.as_posix()}",\n'
        '  "code": "M017",\n'
        f'  "profileEnvelope": {{"width": {width:g}, "height": {height:g}}},\n'
        f'  "extrusionLength": {extrusion_length:g},\n'
        '  "cleanup": "Shapely simplify tolerance 1.25; stepped contour retained; no smoothing",\n'
        f'  "points": {points!r}\n'
        "}\n",
        encoding="utf-8",
    )
    print(f"M017 master written: {len(mesh.faces)} faces, envelope {width:g} x {height:g}, length {extrusion_length:g}")


if __name__ == "__main__":
    main()
