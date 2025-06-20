import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
function Cube({ scale, rotationY }) {
    const meshRef = useRef();
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y = rotationY;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}

export default Cube
