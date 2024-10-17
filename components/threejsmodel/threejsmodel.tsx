import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import GlassBall from "./components/glassball";
import Base from "./components/base";
import * as THREE from "three";
import SmallBallsAnimation from "./components/Animations/smallballsani";

const createCylinderMesh = (position, args, materialProps) => (
  <mesh position={position}>
    <cylinderGeometry args={args} />
    <meshPhysicalMaterial {...materialProps} />
  </mesh>
);

const cylinderMaterialProps = {
  color: 0xffffff,
  metalness: 0.8,
  roughness: 0.1,
  reflectivity: 1,
  clearcoat: 1.5,
  clearcoatRoughness: 0.5,
  side: THREE.DoubleSide,
};

const cylinderMeshData = [
  { position: [0, 3.4, 0], args: [0.45, 0.45, 0.3, 40] },
  { position: [0, 4.3, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 4.37, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 5.3, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 5.23, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 3.17, 0], args: [1, 1, 0.2, 40] },
];

const AnimatedCamera = () => {
  const [zoomProgress, setZoomProgress] = useState(0);

  useFrame(({ camera }) => {
    if (zoomProgress < 1) {
      setZoomProgress((prev) => Math.min(prev + 0.01, 1));

      const initialPosition = { x: 0, y: 0, z: 30 };
      const targetPosition = { x: 0, y: 4.8, z: 3 };

      const newXPosition = THREE.MathUtils.lerp(
        initialPosition.x,
        targetPosition.x,
        zoomProgress,
      );
      const newYPosition = THREE.MathUtils.lerp(
        initialPosition.y,
        targetPosition.y,
        zoomProgress,
      );
      const newZPosition = THREE.MathUtils.lerp(
        initialPosition.z,
        targetPosition.z,
        zoomProgress,
      );

      // Cast camera to PerspectiveCamera to access fov
      const perspectiveCamera = camera as THREE.PerspectiveCamera;
      perspectiveCamera.position.set(newXPosition, newYPosition, newZPosition);
      perspectiveCamera.lookAt(0, 4.8, 0);

      perspectiveCamera.fov = THREE.MathUtils.lerp(75, 35, zoomProgress);
      perspectiveCamera.updateProjectionMatrix();
    }
  });

  return null;
};

const GlassBallWithSmallBalls = () => {
  const [smallBalls, setSmallBalls] = useState<THREE.Mesh[]>([]);
  const [velocities, setVelocities] = useState<THREE.Vector3[]>([]);

  // Ensure to load the cube texture properly
  const textureLoader = new THREE.CubeTextureLoader();
  const texture = textureLoader.load([
    "/assets/imgs/bg.png", // Right
    "/assets/imgs/bg.png", // Left
    "/assets/imgs/bg.png", // Top
    "/assets/imgs/bg.png", // Bottom
    "/assets/imgs/bg.png", // Back
    "/assets/imgs/bg.png", // Front
  ]) as THREE.CubeTexture; // Cast to CubeTexture

  useEffect(() => {
    const smallBallsArray: THREE.Mesh[] = [];
    const velocitiesArray: THREE.Vector3[] = [];

    for (let i = 0; i < 80; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 2.6,
        (Math.random() - 0.5) * 2.6,
        (Math.random() - 0.5) * 2.6,
      );
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
      );

      smallBallsArray.push(
        new THREE.Mesh(
          new THREE.SphereGeometry(0.2),
          new THREE.MeshStandardMaterial({ color: 0xd19520 }),
        ),
      );
      velocitiesArray.push(velocity);
    }

    setSmallBalls(smallBallsArray);
    setVelocities(velocitiesArray);
  }, []);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 3.5, 9], fov: 75 }}
      onCreated={({ gl }) => {
        gl.setSize(window.innerWidth, window.innerHeight);
        gl.shadowMap.enabled = true;
      }}
    >
      {/* <AnimatedCamera /> */}

      {/* Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 0, 5]} intensity={1.5} />
      <directionalLight position={[0, 5, 5]} intensity={1.5} />
      <directionalLight position={[5, 0, 0]} intensity={1.5} />
      <directionalLight position={[5, 1, 0]} intensity={1.5} />
      <directionalLight position={[-5, 0, -5]} intensity={1.5} />
      <directionalLight position={[0, -5, -1]} intensity={1.5} />
      <directionalLight position={[10, -5, 0]} intensity={1.5} />
      <pointLight position={[0, 0, 0]} intensity={2} distance={2} decay={1} />
      <pointLight position={[5, 5, 5]} intensity={2} distance={2} decay={1} />
      <pointLight position={[5, 5, 0]} intensity={2} distance={2} decay={1} />
      <hemisphereLight
        // skyColor={0xffffff}
        groundColor={0x444444}
        intensity={0.5}
      />

      <mesh position={[0, 3.9, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.7, 40]} />
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.5}
          roughness={0}
          transmission={1}
          ior={5.33}
          transparent={true}
          opacity={0.3}
          reflectivity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 5.9, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 1.3, 40]} />
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.5}
          roughness={0}
          transmission={1}
          ior={5.33}
          transparent={true}
          opacity={0.3}
          reflectivity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {cylinderMeshData.map((data, index) =>
        createCylinderMesh(data.position, data.args, cylinderMaterialProps),
      )}

      <GlassBall
        position={new THREE.Vector3(0, 4.8, 0)}
        size={0.57}
        castShadow={false}
        receiveShadow={false}
        envMap={texture}
      />

      <GlassBall castShadow={false} receiveShadow={false} envMap={texture} />

      {/* List of base mesh positions */}
      {[
        [0, -2.78, 3],
        [0.9, -2.78, 2.85],
        [1.8, -2.78, 2.45],
        [2.65, -2.78, 1.5],
        [0, -2.78, -3],
        [0.9, -2.78, -2.85],
        [1.8, -2.78, -2.45],
        [2.65, -2.78, -1.5],
        [0, -2.78, 3],
        [-0.9, -2.78, 2.85],
        [-1.8, -2.78, 2.45],
        [-2.65, -2.78, 1.5],
        [0, -2.78, -3],
        [-0.9, -2.78, -2.85],
        [-1.8, -2.78, -2.45],
        [-2.65, -2.78, -1.5],
        [2.9, -2.78, 0],
        [-2.9, -2.78, 0],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 40]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>
      ))}

      {/* Create Bases with Blue Color */}
      <Base
        positionY={-2.75}
        color={0x000000}
        height={0.01}
        innerRadius={2.5}
        outerRadius={3.5}
      />
      <Base
        positionY={-2.76}
        color={0x0d516d}
        height={0.3}
        innerRadius={2.5}
        outerRadius={3.5}
      />
      {Array.from({ length: 4 }, (_, j) => (
        <React.Fragment key={j}>
          <Base
            positionY={-2.75 - (j + 1) * 0.35 - 0.1 * (j + 1)}
            color={0x0d516d}
            height={0.3}
            innerRadius={2.5}
            outerRadius={3.5}
          />
          <Base
            positionY={-2.72 - (j + 1) * 0.35 - 0.1 * (j + 1)}
            color={0x28282b}
            height={0.2}
            innerRadius={2.48}
            outerRadius={3.48}
          />
        </React.Fragment>
      ))}

      {/* List of centered mesh positions */}
      {[
        [0, -3, 1],
        [0, -3, -0.9],
        [0.9, -3, 0],
        [-0.9, -3, 0],
        [0.6, -3, 0.8],
        [-0.6, -3, 0.8],
        [0.6, -3, -0.8],
        [-0.6, -3, -0.8],
        [0.3, -3, 0],
        [-0.3, -3, 0],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <cylinderGeometry args={[0.25, 0.35, 0.7, 40]} />
          <meshStandardMaterial color={0x000000} />
        </mesh>
      ))}

      {/* Centered mesh */}
      {[
        [0, -2.75, 0],
        [0, -2.85, 0],
        [0, -2.95, 0],
        [0, -3.05, 0],
        [0, -3.15, 0],
        [0, -3.25, 0],
        [0, -3.35, 0],
        [0, -3.45, 0],
        [0, -3.65, 0],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <cylinderGeometry
            args={[1.5 + index * 0.1, 1.6 + index * 0.1, 0.1, 40]}
          />
          <meshStandardMaterial color={index % 2 === 0 ? 0x424540 : 0x30322f} />
        </mesh>
      ))}

      {/* Animate the small balls */}
      {smallBalls.map((ball, i) => (
        <primitive key={i} object={ball} />
      ))}

      <SmallBallsAnimation smallBalls={smallBalls} velocities={velocities} />
    </Canvas>
  );
};

export default GlassBallWithSmallBalls;
