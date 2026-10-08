"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Moldura3DViewerProps {
  glbUrl: string;
  heightMm?: number | null;
  widthMm?: number | null;
  fitFactor?: number;
  mobileFitFactor?: number;
  showHint?: boolean;
}

export default function Moldura3DViewer({ glbUrl, fitFactor = 0.76, mobileFitFactor, showHint = true }: Moldura3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1eee8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-label", "Visualizador 3D interativo da moldura");
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 5000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.minPolarAngle = 0.45;
    controls.maxPolarAngle = 2.5;
    controls.minDistance = 180;
    controls.maxDistance = 1300;
    controls.rotateSpeed = 0.65;
    controls.zoomSpeed = 0.7;

    // Broad, neutral studio sources: the geometry creates the relief contrast.
    scene.add(new THREE.HemisphereLight(0xfffdf7, 0xcfc8bd, 1.25));
    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.8);
    keyLight.position.set(-360, 300, -520);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1536, 1536);
    keyLight.shadow.camera.near = 10;
    keyLight.shadow.camera.far = 1500;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xd9e3ec, 0.35);
    fillLight.position.set(420, 170, 300);
    scene.add(fillLight);

    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;

    const frame = () => {
      if (!model) return;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const sphere = box.getBoundingSphere(new THREE.Sphere());
      const viewDirection = new THREE.Vector3(-1.18, 0.46, -0.72).normalize();
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
      const cameraDistance = Math.max(
        sphere.radius / Math.tan(verticalFov / 2),
        sphere.radius / Math.tan(horizontalFov / 2),
      ) * (window.innerWidth <= 680 ? (mobileFitFactor ?? fitFactor) : fitFactor);
      // Approach from the profile end first, with enough negative-Z angle to
      // keep the stepped decorative side visible across the length.
      camera.position.copy(center).add(viewDirection.multiplyScalar(cameraDistance));
      camera.lookAt(center.x, center.y - size.y * 0.06, center.z);
      controls.target.set(center.x, center.y - size.y * 0.06, center.z);
      controls.minDistance = cameraDistance * 0.55;
      controls.maxDistance = cameraDistance * 1.85;
      controls.update();
    };
    resetRef.current = frame;

    loader.load(
      glbUrl,
      (gltf) => {
        model = gltf.scene;
        model.traverse((child) => {
          if (!(child as THREE.Mesh).isMesh) return;
          const mesh = child as THREE.Mesh;
          // Keep authored GLB normals: recomputing them would soften the
          // architectural steps and turn the exact profile into a rounded slab.
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0xe9e2d7,
            roughness: 0.76,
            metalness: 0,
            envMapIntensity: 0.35,
          });
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        });

        scene.add(model);
        frame();
        setLoading(false);
      },
      undefined,
      () => {
        setError("Não foi possível carregar o modelo 3D.");
        setLoading(false);
      },
    );

    const resize = () => {
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 420;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      scene.traverse((object) => {
        if (!(object as THREE.Mesh).isMesh) return;
        const mesh = object as THREE.Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
        else mesh.material.dispose();
      });
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      resetRef.current = null;
    };
  }, [fitFactor, glbUrl, mobileFitFactor, retryKey]);

  return (
    <div className="moldura-3d-shell">
      {loading && (
        <div className="moldura-3d-loading" role="status">
          <span className="moldura-3d-spinner" />
          <span>Preparando a vista da moldura…</span>
        </div>
      )}
      {error && (
        <div className="moldura-3d-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => { setError(null); setLoading(true); setRetryKey((current) => current + 1); }}>
            Tentar novamente
          </button>
        </div>
      )}
      <div ref={containerRef} className="moldura-3d-canvas" />
      {showHint && <div className="moldura-3d-hint" aria-hidden="true">Arraste para girar · role para aproximar</div>}
      <button className="moldura-3d-reset" type="button" onClick={() => resetRef.current?.()} aria-label="Reiniciar enquadramento 3D" title="Reiniciar enquadramento 3D">
        Reiniciar vista
      </button>
    </div>
  );
}
