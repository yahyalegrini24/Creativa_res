/* eslint-disable no-unused-vars */
import { useGLTF } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Robot({ isAnimating, isSpeaking, isSpinning, position = [0, 0, 0] }) {
  const robot = useGLTF('/cam4.glb');
  const groupRef = useRef();
  const headRef = useRef();
  const spinStartTime = useRef(null);

  const { center, modelScale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(robot.scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const desiredScale = 20 / maxDim;
    return { center, modelScale: desiredScale };
  }, [robot.scene]);

  useFrame(({ clock }) => {
    if (headRef.current) {
      const time = clock.getElapsedTime();
      
      if (isSpinning) {
        if (!spinStartTime.current) {
          spinStartTime.current = time;
        }
        
        const spinProgress = (time - spinStartTime.current) / 1;
        const spinAngle = Math.min(Math.PI * 2 * spinProgress, Math.PI * 2);
        
        if (groupRef.current) {
          groupRef.current.rotation.y = spinAngle;
        }
        
        // More extreme movements during spin
        headRef.current.rotation.x = Math.sin(time * 12) * 0.4;
        headRef.current.rotation.z = Math.cos(time * 10) * 0.3;
        headRef.current.rotation.y = Math.sin(time * 8) * 0.3;
      } else {
        spinStartTime.current = null;
        const intensity = isSpeaking ? 1.5 : 0.8;
        
        headRef.current.rotation.y = (
          Math.sin(time * 2.5) * 0.3 + 
          Math.cos(time * 1.7) * 0.2 +
          Math.sin(time * 3.3) * 0.15
        ) * intensity;
        
        headRef.current.rotation.x = (
          Math.sin(time * 3.1) * 0.2 +
          Math.cos(time * 2.3) * 0.15
        ) * intensity;
        
        headRef.current.rotation.z = Math.sin(time * 2.8) * 0.1 * intensity;
        
        if (groupRef.current) {
          groupRef.current.position.y = (
            Math.sin(time * 4.2) * 0.15 +
            Math.cos(time * 3.7) * 0.09
          ) * intensity;
          
          groupRef.current.position.x = Math.sin(time * 2.9) * 0.09 * intensity;
          
          groupRef.current.rotation.z = (
            Math.sin(time * 2.5) * 0.12 +
            Math.cos(time * 1.8) * 0.08
          ) * intensity;
          
          groupRef.current.rotation.y = Math.sin(time * 1.5) * 0.05 * intensity;
        }
      }
    }
  });

  return (
    <group
      ref={groupRef}
      scale={modelScale}
      position={position}
    >
      <primitive 
        object={robot.scene} 
        position={[-center.x, -center.y, -center.z]}
      />
      <mesh ref={headRef} position={[0, 1, 0]} />
    </group>
  );
}
