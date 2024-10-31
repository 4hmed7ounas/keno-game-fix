import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import Base from "./base";
import SmallBallsAnimation from "./Animations/smallballsani";
import GlassBall from "./glassball";

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
  roughness: 0,
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
  { position: [0, 4.25, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 4.32, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 5.33, 0], args: [0.45, 0.45, 0.06, 40] },
  { position: [0, 5.26, 0], args: [0.45, 0.45, 0.06, 40] },
];

const cylinderGlassMeshData = [
  { position: [0, 3.9, 0], args: [0.26, 0.26, 0.8, 40] },
  { position: [0, 5.9, 0], args: [0.26, 0.26, 1.3, 40] },
  { position: [0, 5.6, 0], args: [0.4, 0.4, 0.08, 40] },
  { position: [0, 5.9, 0], args: [0.4, 0.4, 0.06, 40] },
  { position: [0, 6.2, 0], args: [0.4, 0.4, 0.06, 40] },
  { position: [0, 6.5, 0], args: [0.4, 0.4, 0.06, 40] },
  { position: [0, 3.17, 0], args: [1, 1, 0.2, 40] },
  { position: [0, -3.2, 0], args: [1.4, 1.08, 0.6, 40] },
];

const balls = Array.from({ length: ballNumbers }, (_, index) => index + 1);

const GlassBallWithSmallBalls = ({ cameraRef }) => {
  const [smallBalls, setSmallBalls] = useState<THREE.Mesh[]>([]);
  const [velocities, setVelocities] = useState<THREE.Vector3[]>([]);

  useEffect(() => {
    const smallBallsArray: THREE.Mesh[] = [];
    const velocitiesArray: THREE.Vector3[] = [];

    for (let i = 0; i < ballNumbers; i++) {
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25,
      );

      smallBallsArray.push(
        new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 64, 64),
          new THREE.MeshStandardMaterial({ color: 0xd19520 }),
        ),
      );
      velocitiesArray.push(velocity);
    }

    setSmallBalls(smallBallsArray);
    setVelocities(velocitiesArray);
  }, []);

  const startZoomAnimation = () => {
    const is530 = window.matchMedia("(max-width: 530px)").matches;
    const is768 = window.matchMedia("(max-width: 768px)").matches;
    const is1024 = window.matchMedia("(max-width: 1024px)").matches;
    const is1440 = window.matchMedia("(max-width: 1440px)").matches;
    const isLargeScreen = window.matchMedia("(min-width: 1440px)").matches;

    gsap.to(cameraRef.current.position, {
      x: is530
        ? 0
        : is768
          ? -0.4
          : is1024
            ? -0.6
            : is1440
              ? -1.4
              : isLargeScreen
                ? -1
                : -1, // Adjust x position for large screens
      y: 4.8,
      z: is530 ? 22 : is768 ? 20 : 18, // Adjust z position for large screens
      duration: 2,
    });
  };

  useEffect(() => {
    const zoomTimeout = setTimeout(() => {
      startZoomAnimation();
    }, 5000);

    return () => clearTimeout(zoomTimeout);
  }, [cameraRef]);

  // useEffect(() => {
  //   const animateBall = (index) => {
  //     gsap.to(smallBalls[index].position, {
  //       x: 0,
  //       y: 3.2,
  //       z: 0,
  //       duration: 1,
  //       onComplete: () => {
  //         gsap.to(smallBalls[index].position, {
  //           x: 0,
  //           y: 4.1,
  //           z: 0,
  //           duration: 0.1,
  //           onComplete: () => {
  //             gsap.to(smallBalls[index].position, {
  //               y: 4.8,
  //               duration: 0.1,
  //               onComplete: () => {},
  //             });
  //             gsap.to(smallBalls[index].scale, {
  //               x: 2.2,
  //               y: 2.2,
  //               z: 2,
  //               duration: 0.05,
  //               onComplete: () => {
  //                 gsap.to(smallBalls[index].scale, {
  //                   x: 2.6,
  //                   y: 2.6,
  //                   z: 2,
  //                   duration: 0.1,
  //                 });
  //                 setTimeout(() => {
  //                   gsap.to(smallBalls[index].position, {
  //                     y: 5.9,
  //                     duration: 0.5,
  //                   });
  //                   gsap.to(smallBalls[index].scale, {
  //                     x: 0,
  //                     y: 0,
  //                     z: 0,
  //                     duration: 0.5,
  //                   });
  //                 }, 3000);
  //               },
  //             });
  //           },
  //         });
  //       },
  //     });
  //   };

  //   const interval = setInterval(() => {
  //     const randomIndex = Math.floor(Math.random() * smallBalls.length);
  //     animateBall(randomIndex);
  //   }, 7000);

  //   return () => clearInterval(interval);
  // }, [smallBalls]);
  useEffect(() => {
    const animateBall = (index) => {
      gsap.to(smallBalls[index].position, {
        x: 0,
        y: 3.2,
        z: 0,
        duration: 1,
        onComplete: () => {
          gsap.to(smallBalls[index].position, {
            x: 0,
            y: 4.1,
            z: 0,
            duration: 0.1,
            onComplete: () => {
              gsap.to(smallBalls[index].position, {
                y: 4.8,
                duration: 0.1,
                onComplete: () => {
                  gsap.to(smallBalls[index].position, {
                    y: 4.7,
                    duration: 0.1,
                    ease: "bounce.out",
                  });
                  gsap.to(smallBalls[index].position, {
                    y: 4.8,
                    duration: 0.1,
                    delay: 0.1,
                    ease: "bounce.out",
                  });
                  gsap.to(smallBalls[index].position, {
                    y: 4.7,
                    duration: 0.1,
                    delay: 0.1,
                    ease: "bounce.out",
                  });
                  gsap.to(smallBalls[index].position, {
                    y: 4.8,
                    duration: 0.1,
                    delay: 0.1,
                    ease: "bounce.out",
                  });
                  gsap.to(smallBalls[index].scale, {
                    x: 2.2,
                    y: 2.2,
                    z: 2,
                    duration: 0.05,
                    onComplete: () => {
                      gsap.to(smallBalls[index].scale, {
                        x: 2.6,
                        y: 2.6,
                        z: 2,
                        duration: 0.1,
                      });
                      setTimeout(() => {
                        gsap.to(smallBalls[index].position, {
                          y: 5.9,
                          duration: 0.5,
                        });
                        gsap.to(smallBalls[index].scale, {
                          x: 0,
                          y: 0,
                          z: 0,
                          duration: 0.5,
                        });
                      }, 3000);
                    },
                  });
                },
              });
            },
          });
        },
      });
    };

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * smallBalls.length);
      animateBall(randomIndex);
    }, 7000);

    return () => clearInterval(interval);
  }, [smallBalls]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 0, 5]} intensity={1} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <directionalLight position={[5, 0, 0]} intensity={1} />
      <directionalLight position={[5, 1, 0]} intensity={1} />
      <directionalLight position={[-5, 0, -5]} intensity={1} />
      <directionalLight position={[0, -5, -1]} intensity={1} />
      <directionalLight position={[10, -5, 0]} intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={2} distance={2} decay={1} />
      <pointLight position={[5, 5, 5]} intensity={2} distance={2} decay={1} />
      <pointLight position={[5, 5, 0]} intensity={2} distance={2} decay={1} />

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
        [0, -4.03, 2.85],
        [0.9, -4, 2.75],
        [1.8, -3.84, 2.35],
        [2.65, -3.45, 1.4],
        [-0.9, -4, 2.75],
        [-1.8, -3.84, 2.35],
        [-2.65, -3.45, 1.4],
        [0, -1.7, -2.8],
        [0.9, -1.75, -2.65],
        [1.8, -1.94, -2.25],
        [2.65, -2.29, -1.4],
        [-0.9, -1.75, -2.65],
        [-1.8, -1.94, -2.25],
        [-2.65, -2.29, -1.4],
        [3, -2.86, 0],
        [-3, -2.86, 0],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          rotation={[Math.PI / 5.2, 0, 0]}
          receiveShadow
        >
          <cylinderGeometry args={[0.1, 0.1, 0.1, 40]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>
      ))}

      <Base
        positionY={-2.85}
        color={0x000000}
        height={0.01}
        innerRadius={2.5}
        outerRadius={3.5}
      />
      <Base
        positionY={-2.86}
        color={0x0faee2}
        height={0.25}
        innerRadius={2.5}
        outerRadius={3.5}
      />
      {Array.from({ length: 4 }, (_, j) => (
        <React.Fragment key={j}>
          <Base
            positionY={-2.85 - (j + 1) * 0.6 - 0.1 * (j + 1)}
            color={0x0cc3ff}
            height={0.25}
            innerRadius={2.5}
            outerRadius={3.5}
          />
          <Base
            positionY={-2.82 - (j + 1) * 0.6 - 0.1 * (j + 1)}
            color={0x000000}
            height={0.25}
            innerRadius={2.4}
            outerRadius={3.3}
          />
        </React.Fragment>
      ))}

      {[
        [0, -3.43, -0.7],
        [0, -3.77, 0.6],
        [-0.9, -3.62, 0],
        [0.9, -3.62, 0],
        [0.6, -3.75, 0.45],
        [-0.6, -3.75, 0.45],
        [0.6, -3.5, -0.5],
        [-0.6, -3.5, -0.5],
        [0.3, -3.62, 0],
        [-0.3, -3.62, 0],
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
