"use client";

import { useRef, useState, Suspense, useEffect } from "react";
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
  const modelPath = clothingType === "kebaya" 
    ? "/models/kebaya.glb" 
    : "/models/kemeja.glb"; // Use kemeja for both shirt and dress

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
          console.log("Applying texture to mesh:", child.name);
          child.material.map = texture;
          child.material.needsUpdate = true;
          // Ensure the material is set to use the texture
          if (child.material.color) {
            child.material.color.setHex(0xffffff); // White to show texture properly
          }
        } else {
          // Default color when no texture
          child.material.map = null;
          child.material.color = new THREE.Color("#047857");
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
    </>
  );
}

// Preload models
useGLTF.preload("/models/kemeja.glb");
useGLTF.preload("/models/kebaya.glb");

interface ModelViewerProps {
  textureUrl: string | null;
  clothingType: "shirt" | "kebaya" | "dress";
}

function ModelViewer({ textureUrl, clothingType }: ModelViewerProps) {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <Suspense fallback={null}>
        <ClothingModel textureUrl={textureUrl} clothingType={clothingType} />
        <OrbitControls enableZoom={true} enablePan={false} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}

export default function AIStudio() {
  const [prompt, setPrompt] = useState("");
  const [generatedTextureUrl, setGeneratedTextureUrl] = useState<string | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [clothingType, setClothingType] = useState<
    "shirt" | "kebaya" | "dress"
  >("shirt");

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
        console.log("Generated texture URL from Cloudinary:", data.imageUrl);
        setGeneratedTextureUrl(data.imageUrl);
      } else {
        console.error("Failed to generate image:", data);
        alert("Failed to generate texture. Please try again.");
      }
    } catch (error) {
      console.error("Error generating texture:", error);
      alert("An error occurred while generating the texture. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-[#047857] to-[#EAB308] bg-clip-text text-transparent">
            AI Batik Design Studio
          </span>
        </h1>
        <p className="text-xl text-[#065F46]/70 max-w-2xl mx-auto">
          Describe your vision and watch AI bring Indonesian batik patterns to
          life
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-sm font-semibold text-[#065F46] mb-2">
              Clothing Type
            </label>
            <select
              value={clothingType}
              onChange={(e) =>
                setClothingType(e.target.value as "shirt" | "kebaya" | "dress")
              }
              className="w-full px-4 py-3 border border-[#EAB308]/20 rounded-lg focus:ring-2 focus:ring-[#047857] focus:border-transparent bg-white"
              aria-label="Select clothing type"
            >
              <option value="shirt">Shirt (Kemeja)</option>
              <option value="kebaya">Kebaya</option>
              <option value="dress">Dress</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-sm font-semibold text-[#065F46] mb-2">
              Describe your batik style...
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., batik parang with blue ocean tone, traditional motifs with modern gradient"
              className="w-full px-4 py-3 border border-[#EAB308]/20 rounded-lg focus:ring-2 focus:ring-[#047857] focus:border-transparent min-h-[150px] bg-white"
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="btn-primary mt-4 w-full px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? "Generating..." : "Generate Texture"}
            </button>
          </div>

          {generatedTextureUrl && (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-[#065F46] mb-4">
                  Generated Texture Preview
                </h3>
                <Image
                  src={generatedTextureUrl}
                  alt="Generated batik texture"
                  width={500}
                  height={500}
                  className="w-full rounded-lg border border-[#EAB308]/20"
                />
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-[#065F46] mb-4">
                  Ready to order?
                </h3>
                <p className="text-[#065F46]/70 mb-4 text-sm">
                  Connect with local artisans to bring this design to life
                </p>
                <button
                  type="button"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#047857] to-[#059669] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-[#059669] hover:to-[#EAB308] transform hover:scale-105 transition-all duration-300"
                >
                  Order This Design
                </button>
              </div>
            </>
          )}
        </div>

        {/* 3D Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-display font-semibold text-[#065F46] mb-4">
            3D Preview
          </h3>
          <div className="w-full h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-[#FAF9F6] to-[#F5F5DC] border border-[#EAB308]/10">
            <ModelViewer textureUrl={generatedTextureUrl} clothingType={clothingType} />
          </div>
          {!generatedTextureUrl && (
            <p className="text-center text-[#065F46]/60 mt-4">
              Generate a texture to see it applied to the 3D model
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
