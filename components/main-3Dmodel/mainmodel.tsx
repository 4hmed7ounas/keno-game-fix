import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import GlassBallWithSmallBalls from "./components/glassballwithsmallballs";

const MainModel = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null); // Declare cameraRef here

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 150], fov: 5 }}
      onCreated={({ gl, camera }) => {
        cameraRef.current = camera as THREE.PerspectiveCamera;
        gl.setSize(window.innerWidth, window.innerHeight);
        gl.shadowMap.enabled = true;
      }}
    >
      
      <GlassBallWithSmallBalls cameraRef={cameraRef} />{" "}
    </Canvas>
  );
};

export default MainModel;
