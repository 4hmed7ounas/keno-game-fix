import React, { forwardRef } from 'react';
import * as THREE from 'three';

interface SmallBallProps {
  position?: THREE.Vector3;
  color?: number;
}

const SmallBall = forwardRef<THREE.Mesh, SmallBallProps>(({ position, color = 0xffff00 }, ref) => {
  const smallBallGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const smallBallMaterial = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.3,
    roughness: 0.5,
  });

  const smallBall = new THREE.Mesh(smallBallGeometry, smallBallMaterial);
  
  if (position) {
    smallBall.position.copy(position);
  }

  // Use the ref to allow access to the Mesh
  return <primitive object={smallBall} ref={ref} />;
});

export default SmallBall;
