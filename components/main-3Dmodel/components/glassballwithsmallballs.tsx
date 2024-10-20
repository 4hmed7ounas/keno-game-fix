import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import GlassBall from "./glassball";
import Base from "./base";
import SmallBallsAnimation from "./Animations/smallballsani";

const ballNumbers = 80;
const createCylinderMesh = (position, args, materialProps) => (
  <mesh position={position}>
    <cylinderGeometry args={args} />
    <meshPhysicalMaterial {...materialProps} />
  </mesh>
);

const cylinderMaterialProps = {
  color: 0x81847d,
  metalness: 0.8,
  roughness: 0.1,
  reflectivity: 1,
  clearcoat: 1.5,
  clearcoatRoughness: 0.5,
  side: THREE.DoubleSide,
};
const cylinderGlassProps = {
  color: 0xffffff,
  metalness: 0.5,
  roughness: 0.1,
  transmission: 1,
  ior: 5.33,
  transparent: true,
  opacity: 0.3,
  reflectivity: 1,
  side: THREE.DoubleSide,
};

const cylinderMeshData = [
  { position: [0, 3.45, 0], args: [0.45, 0.45, 0.1, 40] },
  { position: [0, 3.32, 0], args: [0.45, 0.45, 0.1, 40] },
  { position: [0, 4.3, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 4.37, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 5.3, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 5.23, 0], args: [0.45, 0.45, 0.06, 40] },
];
const cylinderGlassMeshData = [
  { position: [0, 3.9, 0], args: [0.26, 0.26, 0.8, 40] },
  { position: [0, 5.9, 0], args: [0.26, 0.26, 1.3, 40] },
  { position: [0, 5.6, 0], args: [0.4, 0.4, 0.06, 40] },
  { position: [0, 5.9, 0], args: [0.4, 0.4, 0.06, 40] },
  { position: [0, 6.2, 0], args: [0.4, 0.4, 0.06, 40] },
  { position: [0, 6.5, 0], args: [0.4, 0.4, 0.06, 40] },
  { position: [0, 3.17, 0], args: [1, 1, 0.2, 40] },
];

const balls = Array.from({ length: ballNumbers }, (_, index) => index + 1);

const GlassBallWithSmallBalls = ({ cameraRef }) => {
  const [smallBalls, setSmallBalls] = useState<THREE.Mesh[]>([]);
  const [velocities, setVelocities] = useState<THREE.Vector3[]>([]);
  const [movingBallIndex, setMovingBallIndex] = useState<number[]>([]);

  useEffect(() => {
    const smallBallsArray: THREE.Mesh[] = [];
    const velocitiesArray: THREE.Vector3[] = [];

    for (let i = 0; i < ballNumbers; i++) {
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

  const [, setIsZooming] = useState(false);

  useEffect(() => {
    const zoomTimeout = setTimeout(() => {
      setIsZooming(true);

      gsap.to(cameraRef.current.position, {
        x: -1,
        y: 4.8,
        z: 18,
        duration: 2,
      });
    }, 5000);

    return () => clearTimeout(zoomTimeout);
  }, [cameraRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * smallBalls.length);
      } while (movingBallIndex.includes(randomIndex));

      setMovingBallIndex((prev) => [...prev, randomIndex]);

      gsap.to(smallBalls[randomIndex].position, {
        x: 0,
        y: 3.2,
        z: 0,
        duration: 1,
        onComplete: () => {
          const velocitiesArray: THREE.Vector3[] = [];

          for (let i = 0; i < ballNumbers; i++) {
            const velocity = new THREE.Vector3(0, 0, 0);
            velocitiesArray.push(velocity);
          }
          setVelocities(velocitiesArray);
          gsap.to(smallBalls[randomIndex].position, {
            x: 0,
            y: 4.1,
            z: 0,
            duration: 0.1,
            onComplete: () => {
              gsap.to(smallBalls[randomIndex].position, {
                y: 4.8,
                duration: 1,
              });
              gsap.to(smallBalls[randomIndex].scale, {
                x: 2.75,
                y: 2.5,
                z: 2,
                duration: 1,
              });
              setTimeout(() => {
                gsap.to(smallBalls[randomIndex].position, {
                  y: 5.9,
                  duration: 1,
                });
                gsap.to(smallBalls[randomIndex].scale, {
                  x: 0,
                  y: 0,
                  z: 0,
                  duration: 1,
                });
              }, 5000);
            },
          });
        },
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [smallBalls, movingBallIndex]);

  return (
    <>
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
      <hemisphereLight groundColor={0x444444} intensity={0.5} />

      {cylinderGlassMeshData.map((data, index) =>
        createCylinderMesh(data.position, data.args, cylinderGlassProps),
      )}

      {cylinderMeshData.map((data, index) =>
        createCylinderMesh(data.position, data.args, cylinderMaterialProps),
      )}

      <GlassBall
        position={new THREE.Vector3(0, 4.8, 0)}
        size={0.57}
        castShadow={false}
        receiveShadow={false}
      />
      <GlassBall
        position={new THREE.Vector3(0, 0, 0)}
        castShadow={false}
        receiveShadow={false}
      />

      {[
        [0, -3.93, 2.85],
        [0.9, -3.9, 2.75],
        [1.8, -3.74, 2.35],
        [2.65, -3.35, 1.4],
        [-0.9, -3.9, 2.75],
        [-1.8, -3.74, 2.35],
        [-2.65, -3.35, 1.4],
        [0, -1.6, -2.8],
        [0.9, -1.65, -2.65],
        [1.8, -1.84, -2.25],
        [2.65, -2.19, -1.4],
        [-0.9, -1.65, -2.65],
        [-1.8, -1.84, -2.25],
        [-2.65, -2.19, -1.4],
        [3, -2.76, 0],
        [-3, -2.76, 0],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          rotation={[Math.PI / 5.2, 0, 0]}
          receiveShadow
        >
          <cylinderGeometry args={[0.15, 0.15, 0.1, 40]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>
      ))}

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
            color={0x000000}
            height={0.2}
            innerRadius={2.48}
            outerRadius={3.48}
          />
        </React.Fragment>
      ))}

      {[
        [0, -2.73, -0.7],
        [0, -3.07, 0.6],
        [-0.9, -2.92, 0],
        [0.9, -2.92, 0],
        [0.6, -3.05, 0.45],
        [-0.6, -3.05, 0.45],
        [0.6, -2.8, -0.5],
        [-0.6, -2.8, -0.5],
        [0.3, -2.92, 0],
        [-0.3, -2.92, 0],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          rotation={[Math.PI / -1.12, 0, 0]}
          receiveShadow
        >
          <cylinderGeometry args={[0.17, 0.17, 0.7, 40]} />
          <meshPhysicalMaterial
            color={0x000000}
            metalness={0.1}
            roughness={0.45}
            reflectivity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {[
        [0, -2.65, 0],
        [0, -2.75, 0],
        [0, -2.85, 0],
        [0, -2.95, 0],
        [0, -3.05, 0],
        [0, -3.15, 0],
        [0, -3.25, 0],
        [0, -3.35, 0],
        [0, -3.45, 0],
        [0, -3.55, 0],
        [0, -3.65, 0],
        [0, -3.75, 0],
        [0, -3.85, 0],
        [0, -3.95, 0],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          rotation={[Math.PI / -1.09, 0, 0]}
          receiveShadow
        >
          <cylinderGeometry
            args={[1.2 + index * 0.1, 1.1 + index * 0.1, 0.1, 40]}
          />
          <meshPhysicalMaterial
            color={index % 2 === 0 ? 0x424540 : 0x30322f}
            metalness={0.1}
            roughness={0.48}
            reflectivity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {smallBalls.map((ball, i) => (
        <primitive key={i} object={ball} />
      ))}

      <SmallBallsAnimation
        smallBalls={smallBalls}
        velocities={velocities}
        ballNumbers={balls}
      />
    </>
  );
};

export default GlassBallWithSmallBalls;
