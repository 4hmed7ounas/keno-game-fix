import React, { useEffect } from 'react';
import * as THREE from 'three';

interface SmallBallsAnimationProps {
  smallBalls: THREE.Mesh[];
  velocities: THREE.Vector3[];
  smallVelocities: THREE.Vector3[];
  ballNumbers: number[];
  camera?: THREE.Camera;
}

const SmallBallsAnimation: React.FC<SmallBallsAnimationProps> = ({ smallBalls, velocities, smallVelocities, ballNumbers, camera }) => {
  const textures = React.useMemo(() => {
    return ballNumbers.map((number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'white'; // Background color
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = 'bold 100px TimesNewRoman';
        context.fillStyle = 'black'; // Text color
        context.fillText(number.toString(), 18, 160); // Draw number
      }
      return new THREE.CanvasTexture(canvas); // Create texture from the canvas
    });
  }, [ballNumbers]);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      smallBalls.forEach((ball, i) => {
        ball.position.add(velocities[i]);

        const distanceFromCenter = ball.position.length();
        const glassBallRadius = 3 - 0.4;

        if (distanceFromCenter >= glassBallRadius) {
          velocities[i].negate(); // Reverse the velocity
        }

        // Stop rotation of the ball to keep the number front-facing
        ball.rotation.set(0, 0, 0); // Prevent rotation of the ball

        // Optional: Make the ball always face the camera (billboarding effect)
        if (camera) {
          ball.lookAt(new THREE.Vector3(0, 0, 0)); // Ensure the ball faces the camera
        }

        // Update material texture
        if (Array.isArray(ball.material)) {
          ball.material.forEach((material) => {
            // Type check for materials that have a map property
            if (material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhongMaterial) {
              material.map = textures[i]; // Apply the corresponding texture
              material.needsUpdate = true; // Notify that the material needs updating
            }
          });
        } else {
          if (ball.material instanceof THREE.MeshBasicMaterial || ball.material instanceof THREE.MeshStandardMaterial || ball.material instanceof THREE.MeshPhongMaterial) {
            ball.material.map = textures[i]; // Apply the texture
            ball.material.needsUpdate = true; // Notify that the material needs updating
          }
        }
      });
    };

    animate(); // Start the animation loop
  }, [smallBalls, velocities, textures, camera]); // Add camera to the dependency array

  return null; // This component doesn't render anything itself
};

export default SmallBallsAnimation;
