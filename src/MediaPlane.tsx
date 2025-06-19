// MediaPlane.jsx
import React, { Suspense } from 'react';
import { useTexture, useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';

// This component handles the logic for a single plane's texture
function PlaneMaterial({ src }) {
  // Check the file extension to determine if it's a video
  const isVideo = true;

  let texture;
  if (isVideo) {
    // UseVideoTexture for videos. It returns a video element that needs to play.
    texture = useVideoTexture(src);
  } else {
    // UseTexture for images
    texture = useTexture(src);
  }

  // Ensure textures don't repeat
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;

  return <meshStandardMaterial map={texture} toneMapped={false} roughness={0.3} metalness={0.2} />;
}


// The actual plane component, wrapped in Suspense for async texture loading
export function MediaPlane({ src, size = [1, 1] }) {
  return (
    <mesh>
      <planeGeometry args={size} />
      <Suspense fallback={<meshBasicMaterial color="#333" wireframe />}>
        <PlaneMaterial src={src} />
      </Suspense>
    </mesh>
  );
}
