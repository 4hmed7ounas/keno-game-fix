import React from "react";
import * as THREE from "three";

const createBaseWithHole = (
  outerRadius: number,
  innerRadius: number,
  height: number,
  choice: boolean,
) => {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, choice);
  shape.absarc(0, 0, innerRadius, Math.PI * 2, 0, true);

  return shape; // Return the shape instead of geometry
};

const Base: React.FC<{
  positionY: number;
  color: number;
  height: number;
  innerRadius: number;
  outerRadius: number;
  choice?: boolean;
}> = ({
  positionY,
  color,
  height,
  innerRadius,
  outerRadius,
  choice = false,
}) => {
  const baseShape = createBaseWithHole(
    outerRadius,
    innerRadius,
    height,
    choice,
  );

  // Extrusion settings
  const extrudeSettings = {
    depth: height,
    bevelEnabled: false,
    curveSegments: 100,
  };

  return (
    <mesh position={[0, positionY, 0]} rotation-x={Math.PI / 1.6} receiveShadow>
      <extrudeGeometry args={[baseShape, extrudeSettings]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.1}
        roughness={0.5}
        transmission={0.2}
        reflectivity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Base;
