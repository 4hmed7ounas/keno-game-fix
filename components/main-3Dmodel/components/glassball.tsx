import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

interface GlassBallProps {
  position?: THREE.Vector3;
  size?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

const GlassBall: React.FC<GlassBallProps> = ({
  position = new THREE.Vector3(0, 0, 0),
  size = 3.2,
  castShadow = false,
  receiveShadow = false,
}) => {
  const [reflectionTexture, setReflectionTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const textureLoader = new TextureLoader();

    // Load the texture
    textureLoader.load("/assets/imgs/bg.png", (texture) => {
      setReflectionTexture(texture);
    }, undefined, (error) => {
      console.error("An error occurred while loading the texture:", error);
    });
  }, []);

  return (
    <mesh
      position={position}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      <sphereGeometry args={[size, 128, 128]} />
      {reflectionTexture ? (
        <meshPhysicalMaterial
          metalness={0.5}
          roughness={0}
          transmission={1}
          ior={1.5} // Typically glass has an IOR around 1.5
          transparent={true}
          opacity={0.3} // Adjust opacity as needed
          reflectivity={1}
          side={THREE.DoubleSide}
          envMap={reflectionTexture}
        />
      ) : (
        // Fallback material while loading
        <meshBasicMaterial color={0x888888} />
      )}
    </mesh>
  );
};

export default GlassBall;
