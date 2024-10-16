import { useEffect } from 'react';
import * as THREE from 'three';

interface SmallBallsAnimationProps {
  smallBalls: THREE.Mesh[];
  velocities: THREE.Vector3[];
}

const SmallBallsAnimation: React.FC<SmallBallsAnimationProps> = ({ smallBalls, velocities }) => {
  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      smallBalls.forEach((ball, i) => {
        // Update ball position
        ball.position.add(velocities[i]);

        // Check for collision with the glass ball boundary
        const distanceFromCenter = ball.position.length();
        const glassBallRadius = 3 - 0.2;

        if (distanceFromCenter >= glassBallRadius) {
          velocities[i].negate(); // Reverse the velocity
        }

        ball.rotation.x += 0.3;
        ball.rotation.y += 0.3;
      });
    };

    animate(); // Start the animation loop
  }, [smallBalls, velocities]);

  return null; // This component doesn't render anything itself
};

export default SmallBallsAnimation;
