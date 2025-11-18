"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  imageUrl?: string;
}

interface VRViewerProps {
  panoramaUrl: string;
  hotspots?: Hotspot[];
  initialFov?: number;
}

function PanoramaSphere({ url }: { url: string }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error("Error loading panorama:", error);
      }
    );
  }, [url]);

  return (
    <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

function HotspotMarker({
  position,
  onClick,
  isActive,
}: {
  position: [number, number, number];
  onClick: () => void;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshBasicMaterial
          color={isActive ? "#EAB308" : hovered ? "#EAB308" : "#047857"}
          transparent
          opacity={hovered || isActive ? 1 : 0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial
          color={isActive ? "#EAB308" : hovered ? "#EAB308" : "#047857"}
          transparent
          opacity={hovered || isActive ? 0.8 : 0.6}
        />
      </mesh>
    </group>
  );
}

export default function VRViewer({
  panoramaUrl,
  hotspots = [],
  initialFov = 75,
}: VRViewerProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative w-full h-[600px] md:h-[80vh] rounded-xl overflow-hidden bg-gray-900">
      <Canvas>
        <PerspectiveCamera makeDefault fov={initialFov} position={[0, 0, 0]} />
        <PanoramaSphere url={panoramaUrl} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          autoRotate={false}
        />
        {hotspots.map((hotspot) => (
          <HotspotMarker
            key={hotspot.id}
            position={hotspot.position}
            onClick={() => setActiveHotspot(hotspot.id)}
            isActive={activeHotspot === hotspot.id}
          />
        ))}
      </Canvas>

      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 flex gap-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-white transition-colors"
        >
          {sidebarOpen ? "Hide Info" : "Show Info"}
        </button>
      </div>

      {/* Sidebar */}
      {sidebarOpen && activeHotspot && (
        <div className="absolute top-4 right-4 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto">
          {hotspots
            .filter((h) => h.id === activeHotspot)
            .map((hotspot) => (
              <div key={hotspot.id}>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                <h3 className="text-2xl font-display font-bold text-[#047857] mb-3">
                  {hotspot.title}
                </h3>
                <p className="text-[#065F46]/70 leading-relaxed">
                  {hotspot.description}
                </p>
                {hotspot.imageUrl && (
                  <img
                    src={hotspot.imageUrl}
                    alt={hotspot.title}
                    className="mt-4 rounded-lg w-full"
                  />
                )}
              </div>
            ))}
        </div>
      )}

      {/* Instructions */}
      {!activeHotspot && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
          <p className="text-sm text-gray-700">
            Drag to explore • Click hotspots for details
          </p>
        </div>
      )}
    </div>
  );
}
