import React from "react";
import * as THREE from "three";

interface GlassBallProps {
  position?: THREE.Vector3;
  size?: number; // Add size prop
  castShadow?: boolean; // Add props for shadowing
  receiveShadow?: boolean;
  envMap?: THREE.Texture; // Add optional envMap prop
}

const GlassBall: React.FC<GlassBallProps> = ({
  position,
  size = 3.2, // Default size if not provided
  castShadow = false,
  receiveShadow = false,
  envMap, // Add envMap prop
}) => {
  return (
    <mesh position={position} castShadow={castShadow} receiveShadow={receiveShadow}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshPhysicalMaterial
        color={0xffffff}
        metalness={0.5}
        roughness={0.08}
        transmission={1}
        ior={5.33}
        transparent={true}
        opacity={0.3}
        reflectivity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default GlassBall;
