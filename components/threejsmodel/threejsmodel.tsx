import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import GlassBall from "./components/glassball";
import Base from "./components/base";
import * as THREE from "three";
import SmallBallsAnimation from "./components/Animations/smallballsani";

// Create a separate component for the camera zoom and upward animation
const AnimatedCamera = () => {
  const [zoomProgress, setZoomProgress] = useState(0);
  const [startZoom, setStartZoom] = useState(false); // State to control when to start zooming
  const cameraRef = useRef(null);

  // Add delay before starting the zoom
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartZoom(true); // Start zooming after 5 seconds
    }, 5000); // 5-second delay

    return () => clearTimeout(timeout); // Clean up the timeout on component unmount
  }, []);

  useFrame(({ camera }) => {
    if (startZoom && zoomProgress < 1) {
      setZoomProgress((prev) => Math.min(prev + 0.01, 1)); // Increase zoom progress

      // Define the initial and target camera positions
      const initialPosition = { x: 0, y: 4.8, z: 10 }; // Initial camera position
      const targetPosition = { x: 0, y: 4.8, z: 3 }; // Target position near the GlassBall

      // Interpolate the camera position
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

      camera.position.set(newXPosition, newYPosition, newZPosition); // Set the new interpolated position
      camera.lookAt(0, 4.8, 0); // Look at the GlassBall's position

      // Gradually change the FOV for zoom effect
      camera.fov = THREE.MathUtils.lerp(75, 35, zoomProgress);
      camera.updateProjectionMatrix(); // Update camera projection
    }
  });

  return null; // No JSX, this component controls the camera
};

const GlassBallWithSmallBalls = () => {
  const [smallBalls, setSmallBalls] = useState<THREE.Mesh[]>([]);
  const [velocities, setVelocities] = useState<THREE.Vector3[]>([]);

  // Initialize small balls and velocities
  useEffect(() => {
    const smallBallsArray: THREE.Mesh[] = [];
    const velocitiesArray: THREE.Vector3[] = [];
    const startPositionOffset = new THREE.Vector3(0, -1.5, 0);

    for (let i = 0; i < 80; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 2.6,
        (Math.random() - 0.5) * 2.6,
        (Math.random() - 0.5) * 2.6,
      ).add(startPositionOffset);
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
      );

      const ball = new THREE.Mesh(
        new THREE.SphereGeometry(0.2),
        new THREE.MeshStandardMaterial({ color: 0xff0000 }),
      );
      ball.position.copy(position); // Set the initial position

      smallBallsArray.push(ball);
      velocitiesArray.push(velocity);
    }

    setSmallBalls(smallBallsArray);
    setVelocities(velocitiesArray);
  }, []);
  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 10], fov: 75 }} // Initial camera settings
      onCreated={({ gl }) => {
        gl.setSize(window.innerWidth, window.innerHeight);
        gl.shadowMap.enabled = true;
      }}
    >
      {/* The AnimatedCamera component to handle camera animations */}
      <AnimatedCamera />

      {/* Lighting Setup */}
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 200]} intensity={2} castShadow />
      <directionalLight position={[-5, -10, -5]} intensity={2} castShadow />
      <directionalLight position={[5, 10, 5]} intensity={2} />
      <directionalLight position={[8, 10, 5]} intensity={2} />
      <directionalLight position={[-8, -10, -5]} intensity={2} />

      <mesh position={[0, 3.4, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.3, 40]} />
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.8}
          roughness={0.1}
          reflectivity={1}
          clearcoat={1.5}
          clearcoatRoughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 4.3, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.2, 40]} />
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.8}
          roughness={0.1}
          reflectivity={1}
          clearcoat={1.5}
          clearcoatRoughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 5.3, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.2, 40]} />
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.8}
          roughness={0.1}
          reflectivity={1}
          clearcoat={1.5}
          clearcoatRoughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 3.17, 0]}>
        <cylinderGeometry args={[1, 1, 0.2, 40]} />
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.2}
          roughness={0.1}
          transparent={true}
          opacity={0.3}
          reflectivity={1}
          clearcoat={1.5}
          clearcoatRoughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 3.9, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.7, 40]} />
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.01}
          roughness={0.1}
          transparent={true}
          opacity={0.3}
          reflectivity={1}
          clearcoat={1.5}
          clearcoatRoughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 5.9, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 1.3, 40]} />
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.01}
          roughness={0.1}
          transparent={true}
          opacity={0.3}
          reflectivity={1}
          clearcoat={1.5}
          clearcoatRoughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <GlassBall
        position={new THREE.Vector3(0, 4.8, 0)}
        size={0.57}
        castShadow={false}
        receiveShadow={false}
      />

      <GlassBall castShadow={false} receiveShadow={false} />

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
        color={0x10b9ed}
        height={0.3}
        innerRadius={2.5}
        outerRadius={3.5}
      />
      {Array.from({ length: 4 }, (_, j) => (
        <Base
          key={j}
          positionY={-2.75 - (j + 1) * 0.35 - 0.1 * (j + 1)}
          color={0x10b9ed}
          height={0.3}
          innerRadius={2.5}
          outerRadius={3.5}
        />
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
      <mesh position={[0, -3.5, 0]}>
        <cylinderGeometry args={[1.5, 2.5, 1.6, 40]} />
        <meshStandardMaterial color={0x9da099} />
      </mesh>

      {/* Small Balls */}
      {smallBalls.map((ball, i) => (
        <primitive key={i} object={ball} />
      ))}

      {/* Trigger the SmallBallsAnimation for movement */}
      <SmallBallsAnimation smallBalls={smallBalls} velocities={velocities} />
    </Canvas>
  );
};

export default GlassBallWithSmallBalls;
