// import { useEffect } from 'react';
// import * as THREE from 'three';

// interface SmallBallsAnimationProps {
//   smallBalls: THREE.Mesh[];
//   velocities: THREE.Vector3[];
// }

// const SmallBallsAnimation: React.FC<SmallBallsAnimationProps> = ({ smallBalls, velocities }) => {
//   useEffect(() => {
//     const animate = () => {
//       requestAnimationFrame(animate);

//       smallBalls.forEach((ball, i) => {
//         // Update ball position
//         ball.position.add(velocities[i]);

//         // Check for collision with the glass ball boundary
//         const distanceFromCenter = ball.position.length();
//         const glassBallRadius = 3 - 0.4;

//         if (distanceFromCenter >= glassBallRadius) {
//           velocities[i].negate(); // Reverse the velocity
//         }

//         ball.rotation.x += 0.5;
//         ball.rotation.y += 0.5;
//       });
//     };

//     animate(); // Start the animation loop
//   }, [smallBalls, velocities]);

//   return null; // This component doesn't render anything itself
// };

// export default SmallBallsAnimation;
import React, { useEffect } from 'react';
import * as THREE from 'three';

interface SmallBallsAnimationProps {
  smallBalls: THREE.Mesh[];
  velocities: THREE.Vector3[];
  ballNumbers: number[];
}

const SmallBallsAnimation: React.FC<SmallBallsAnimationProps> = ({ smallBalls, velocities, ballNumbers }) => {
  // Create an array to hold the textures for each ball
  const textures = React.useMemo(() => {
    return ballNumbers.map((number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'white'; // Background color
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = 'bold 90px Arial';
        context.fillStyle = 'black'; // Text color
        context.fillText(number.toString(), canvas.width / 5, canvas.height / 3); // Draw number
      }
      return new THREE.CanvasTexture(canvas); // Create texture from the canvas
    });
  }, [ballNumbers]);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      smallBalls.forEach((ball, i) => {
        // Update ball position
        ball.position.add(velocities[i]);

        // Check for collision with the glass ball boundary
        const distanceFromCenter = ball.position.length();
        const glassBallRadius = 3 - 0.4;

        if (distanceFromCenter >= glassBallRadius) {
          velocities[i].negate(); // Reverse the velocity
        }

        ball.rotation.x += 0.01;
        ball.rotation.y += 0.01;

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
  }, [smallBalls, velocities, textures]); // Add textures to the dependency array

  return null; // This component doesn't render anything itself
};

export default SmallBallsAnimation;
