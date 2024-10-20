import React, { useEffect, useState } from "react";
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

  const textures = React.useMemo(() => {
    return ballNumbers.map((number) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "bold 100px TimesNewRoman";
        context.fillStyle = "black";
        if (number >= 1 && number <= 9) {
          context.fillText(number.toString(), 40, 160);
        } else {
          context.fillText(number.toString(), 18, 160);
        }
      }
      return new THREE.CanvasTexture(canvas);
    });
  }, [ballNumbers]);

  useEffect(() => {
    smallBalls.forEach((ball) => {
      ball.position.set(0, -2.45, 0);
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
          ball.position.add(velocities[i]);

          const distanceFromCenter = Math.sqrt(
            ball.position.x ** 2 + ball.position.y ** 2 + ball.position.z ** 2,
          );
          console.log(distanceFromCenter);

          if (ball.position.y < -2.45 || distanceFromCenter > 2.8) {
            velocities[i].negate();
          }

          if (ball.position.y <= 3.2 || ball.position.y >= -2.45) {
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
      }, 10000);

      return () => {
        clearTimeout(stopAnimationTimeout);
      };
    }, 1000);
  }, [smallBalls, velocities, textures, camera]);

  velocities;
  return null;
};

export default SmallBallsAnimation;
