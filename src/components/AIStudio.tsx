"use client";

import {
  useRef,
  useState,
  Suspense,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

interface ClothingModelProps {
  textureUrl: string | null;
  clothingType: "shirt" | "kebaya" | "dress";
}

function ClothingModel({ textureUrl, clothingType }: ClothingModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Map clothing types to model files
  const modelPath =
    clothingType === "kebaya" ? "/models/kebaya.glb" : "/models/kemeja.glb"; // Use kemeja for both shirt and dress

  const { scene } = useGLTF(modelPath);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    if (!textureUrl) {
      return;
    }

    console.log("Loading texture from URL:", textureUrl);

    // Use Three.js TextureLoader for proper handling
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    loader.load(
      textureUrl,
      (loadedTexture) => {
        console.log("Texture loaded successfully");
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        loadedTexture.repeat.set(1, 1);
        loadedTexture.needsUpdate = true;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );
  }, [textureUrl]);

  // Apply texture to all meshes in the model
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Ensure material is cloned to avoid affecting other instances
        if (!child.userData.materialCloned) {
          child.material = child.material.clone();
          child.userData.materialCloned = true;
        }

        if (texture) {
          child.material.map = texture;
          child.material.needsUpdate = true;
          child.material.color.setHex(0xffffff);
        } else {
          // Elegant white default color
          child.material.map = null;
          child.material.color = new THREE.Color("#f5f5f5");
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, texture]);

  return (
    <>
      <group ref={groupRef} position={[0, -1, 0]} scale={[1, 1, 1]}>
        <primitive object={scene} />
      </group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} />
    </>
  );
}

// Preload models
useGLTF.preload("/models/kemeja.glb");
useGLTF.preload("/models/kebaya.glb");

interface ModelViewerRef {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

interface ModelViewerProps {
  textureUrl: string | null;
  clothingType: "shirt" | "kebaya" | "dress";
}

const ModelViewer = forwardRef<ModelViewerRef, ModelViewerProps>(
  ({ textureUrl, clothingType }, ref) => {
    const controlsRef = useRef<any>(null);

    const handleZoomIn = () => {
      if (controlsRef.current) {
        const currentDistance = controlsRef.current.target.distanceTo(
          controlsRef.current.object.position
        );
        const newDistance = Math.max(2, currentDistance * 0.8);
        controlsRef.current.object.position.lerp(
          controlsRef.current.object.position
            .normalize()
            .multiplyScalar(newDistance),
          1
        );
        controlsRef.current.update();
      }
    };

    const handleZoomOut = () => {
      if (controlsRef.current) {
        const currentDistance = controlsRef.current.target.distanceTo(
          controlsRef.current.object.position
        );
        const newDistance = Math.min(10, currentDistance * 1.2);
        controlsRef.current.object.position.lerp(
          controlsRef.current.object.position
            .normalize()
            .multiplyScalar(newDistance),
          1
        );
        controlsRef.current.update();
      }
    };

    const handleReset = () => {
      if (controlsRef.current) {
        // Reset to default camera position and rotation
        controlsRef.current.object.position.set(0, 0, 5);
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    };

    useImperativeHandle(ref, () => ({
      zoomIn: handleZoomIn,
      zoomOut: handleZoomOut,
      reset: handleReset,
    }));

    return (
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <Suspense fallback={null}>
          <ClothingModel textureUrl={textureUrl} clothingType={clothingType} />
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={10}
          />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    );
  }
);
ModelViewer.displayName = "ModelViewer";

export default function AIStudio() {
  const [prompt, setPrompt] = useState("");
  const [generatedTextureUrl, setGeneratedTextureUrl] = useState<string | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [clothingType, setClothingType] = useState<
    "shirt" | "kebaya" | "dress"
  >("shirt");

  const modelViewerRef = useRef<ModelViewerRef>(null);

  const handleZoomIn = () => {
    modelViewerRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    modelViewerRef.current?.zoomOut();
  };

  const handleResetRotation = () => {
    modelViewerRef.current?.reset();
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    try {
      const fullPrompt = `Generate a seamless, tileable Indonesian batik pattern texture for a ${clothingType}. ${prompt}.

IMPORTANT: Create a seamless texture that can be tiled/repeated without visible seams. The pattern should:
- Be suitable for 3D texture mapping in Three.js
- Have seamless edges that connect perfectly when tiled
- Be a flat, 2D pattern view (not perspective or 3D rendered)
- Feature traditional Indonesian batik motifs and colors
- Be high contrast and detailed enough for textile printing
- Work well when repeated in a grid pattern`;

      const response = await fetch("/api/image-generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.imageUrl) {
        setGeneratedTextureUrl(data.imageUrl);
      } else {
        alert("Failed to generate texture. Please try again.");
      }
    } catch (error) {
      alert(
        "An error occurred while generating the texture. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-gray-900 pt-20">
      {/* 3D Canvas Area - 75% width on desktop, full on mobile */}
      <div className="lg:w-3/4 w-full relative">
        <div className="w-full h-full">
          <ModelViewer
            ref={modelViewerRef}
            textureUrl={generatedTextureUrl}
            clothingType={clothingType}
          />
        </div>

        {/* Floating Control Overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/70 rounded-full px-4 py-2 backdrop-blur-sm">
          <button
            onClick={handleResetRotation}
            className="text-white hover:text-blue-400 transition-colors p-2"
            title="Reset camera"
          >
            🔄
          </button>
          <button
            onClick={handleZoomIn}
            className="text-white hover:text-blue-400 transition-colors p-2"
            title="Zoom in"
          >
            ➕
          </button>
          <button
            onClick={handleZoomOut}
            className="text-white hover:text-blue-400 transition-colors p-2"
            title="Zoom out"
          >
            ➖
          </button>
        </div>
      </div>

      {/* Sidebar - 25% width on desktop, full on mobile */}
      <div className="lg:w-1/4 w-full lg:min-w-[350px] bg-gray-800 border-l rounded-2xl drop-shadow-lg drop-shadow-white/20 border-gray-700 lg:border-l-0 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white mb-2">AI Batik Studio</h2>
          <p className="text-gray-300 text-sm">
            Create Indonesian batik patterns with AI
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Describe your batik style
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., elegant monochrome batik with geometric patterns, traditional jawanese motifs with modern twist..."
              className="w-full h-32 px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 resize-none"
            />
          </div>

          {/* Clothing Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Clothing Type
            </label>
            <select
              value={clothingType}
              onChange={(e) =>
                setClothingType(e.target.value as "shirt" | "kebaya" | "dress")
              }
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
              aria-label="Select clothing type"
            >
              <option value="shirt">Shirt (Kemeja)</option>
              <option value="kebaya">Kebaya</option>
              <option value="dress">Dress</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generating..." : "Generate Pattern"}
          </button>

          {/* Generation History */}
          {generatedTextureUrl && (
            <div>
              <h3 className="font-medium text-gray-200 mb-3">
                Recent Patterns
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded-lg">
                  <Image
                    src={generatedTextureUrl}
                    alt="Generated pattern"
                    width={40}
                    height={40}
                    className="rounded border border-gray-600"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300 truncate">
                      {prompt.length > 30
                        ? prompt.substring(0, 30) + "..."
                        : prompt}
                    </p>
                    <p className="text-xs text-gray-500">{clothingType}</p>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    👁️
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Order Section */}
          {generatedTextureUrl && (
            <div className="pt-4 border-t border-gray-700">
              <h3 className="font-medium text-gray-200 mb-2">
                Ready to order?
              </h3>
              <p className="text-gray-400 text-xs mb-3">
                Connect with local artisans to bring this design to life
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Order This Design
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
