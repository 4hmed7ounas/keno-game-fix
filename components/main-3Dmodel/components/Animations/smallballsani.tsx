import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

interface SmallBallsAnimationProps {
  smallBalls: THREE.Mesh[];
  velocities: THREE.Vector3[];
  ballNumbers: number[];
  camera?: THREE.Camera;
}

const SmallBallsAnimation: React.FC<SmallBallsAnimationProps> = ({
  smallBalls,
  velocities,
  ballNumbers,
  camera,
}) => {
  const ballRadius = 0.2;
  const upwardSpeeds = useMemo(
    () => smallBalls.map(() => Math.random() * 0.15 + 0.05),
    [smallBalls],
  );
  let isRising = true;

  const textures = useMemo(() => {
    return ballNumbers.map((number) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const context = canvas.getContext("2d");

      if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "bold 200px Arail"; // Smaller font size for four places
        context.fillStyle = "black";

        const positions =
          number >= 1 && number <= 9
            ? [
                { x: 80, y: 240 },
                { x: 0, y: 600 },
                { x: 200, y: 560 },
                { x: 160, y: 840 },
                { x: 400, y: 240 },
                { x: 360, y: 640 },
                { x: 360, y: 920 },
                { x: 0, y: 900 },
              ]
            : [
                { x: 80, y: 240 },
                { x: -80, y: 600 },
                { x: 160, y: 560 },
                { x: 160, y: 840 },
                { x: 400, y: 240 },
                { x: 440, y: 640 },
                { x: 400, y: 860 },
                { x: -80, y: 900 },
              ];

        positions.forEach((pos) => {
          const rotationAngle = (Math.random() * Math.PI) / 8 - Math.PI / 16; // Rotate between -11.25 and 11.25 degrees
          context.save();
          context.translate(pos.x + 20, pos.y + 20);
          context.rotate(rotationAngle);
          context.fillText(number.toString(), -20, 0);
          context.restore();
        });
      }

      return new THREE.CanvasTexture(canvas);
    });
  }, [ballNumbers]);

  useEffect(() => {
    const generateRandomPosition = () => {
      let x, y, z, distanceFromCenter;
      do {
        x = Math.random() * 6.4 - 3.2;
        y = Math.random() * (2.25 - 2.85) - 2.1;
        z = Math.random() * 6.4 - 3.2;
        distanceFromCenter = Math.sqrt(x * x + y * y + z * z);
      } while (distanceFromCenter > 2.9);
      return new THREE.Vector3(x, y, z);
    };

    smallBalls.forEach((ball) => {
      const randomPosition = generateRandomPosition();
      ball.position.set(randomPosition.x, randomPosition.y, randomPosition.z);
    });

    const handleCollisions = () => {
      smallBalls.forEach((ballA, i) => {
        for (let j = i + 1; j < smallBalls.length; j++) {
          const ballB = smallBalls[j];
          const distance = ballA.position.distanceTo(ballB.position);

          if (distance < 2 * ballRadius) {
            const normal = new THREE.Vector3()
              .subVectors(ballA.position, ballB.position)
              .normalize();
            const relativeVelocity = new THREE.Vector3().subVectors(
              velocities[i],
              velocities[j],
            );

            const velocityAlongNormal = relativeVelocity.dot(normal);

            if (velocityAlongNormal > 0) return;

            const impulse =
              (2 * velocityAlongNormal) / (1 / ballRadius + 1 / ballRadius);

            velocities[i].sub(
              normal.clone().multiplyScalar(impulse / ballRadius),
            );
            velocities[j].add(
              normal.clone().multiplyScalar(impulse / ballRadius),
            );
          }
        }
      });
    };

    setTimeout(() => {
      const animate = () => {
        requestAnimationFrame(animate);

        smallBalls.forEach((ball, i) => {
          if (isRising) {
            ball.position.y += upwardSpeeds[i];
            if (ball.position.y > 2.4) {
              isRising = false;
            }
          } else {
            ball.position.add(velocities[i]);
          }

          const distanceFromCenter = Math.sqrt(
            ball.position.x ** 2 + ball.position.y ** 2 + ball.position.z ** 2,
          );

          if (ball.position.y < -2.8 || distanceFromCenter > 2.8) {
            velocities[i].negate();
          }

          if (ball.position.y < 2.8 || ball.position.y > -2.8) {
            ball.position.y += velocities[i].y;
          }

          ball.rotation.set(0, 0, 0);

          if (Array.isArray(ball.material)) {
            ball.material.forEach((material) => {
              if (
                material instanceof THREE.MeshBasicMaterial ||
                material instanceof THREE.MeshStandardMaterial ||
                material instanceof THREE.MeshPhongMaterial
              ) {
                material.map = textures[i];
                material.needsUpdate = true;
              }
            });
          } else if (
            ball.material instanceof THREE.MeshBasicMaterial ||
            ball.material instanceof THREE.MeshStandardMaterial ||
            ball.material instanceof THREE.MeshPhongMaterial
          ) {
            ball.material.map = textures[i];
            ball.material.needsUpdate = true;
          }
        });

        handleCollisions();
      };

      animate();
      const stopAnimationTimeout = setTimeout(() => {
        smallBalls.forEach((_, i) => {
          velocities[i].set(0, 0, 0);
        });
      }, 6000);

      return () => {
        clearTimeout(stopAnimationTimeout);
      };
    }, 1000);
  }, [smallBalls, velocities, textures, camera]);

  return null;
};

export default SmallBallsAnimation;
