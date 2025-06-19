import React, { useMemo } from 'react';
import { useGLTF, useTexture, Billboard, Plane } from '@react-three/drei';
import * as THREE from 'three';

const MEDIA_TEXTURE_URL = 'https://threejs.org/examples/textures/crate.gif';

function usePointCloudData(modelUrl, count) {
  const { scene } = useGLTF(modelUrl);

  return useMemo(() => {
    const positions = [];
    const tempPos = new THREE.Vector3();

    let targetMesh = null;
    let maxVertices = 0;

    scene.traverse((object) => {
      if (object.isMesh && object.geometry.attributes.position) {
        const vertexCount = object.geometry.attributes.position.count;
        if (vertexCount > maxVertices) {
          maxVertices = vertexCount;
          targetMesh = object;
        }
      }
    });

    if (!targetMesh) {
      console.error("No valid mesh found in the model.");
      return [];
    }
    
    const vertexPositions = targetMesh.geometry.attributes.position;
    const vertexCount = vertexPositions.count;

    const sampledIndices = new Set();
    while (sampledIndices.size < Math.min(count, vertexCount)) {
      sampledIndices.add(Math.floor(Math.random() * vertexCount));
    }

    for (const index of sampledIndices) {
      tempPos.fromBufferAttribute(vertexPositions, index);
      positions.push(tempPos.clone().applyMatrix4(targetMesh.matrixWorld));
    }

    return positions;
  }, [scene, count]);
}


export function PointCloudMedia({ modelUrl, count }) {
  const texture = useTexture(MEDIA_TEXTURE_URL);
  
  const positions = usePointCloudData(modelUrl, count);
  
  const planeSize = [0.08, 0.08];

  return (
    <group
      rotation={[0, Math.PI / 2, 0]}
    >
      {positions.map((pos, i) => (
        <Billboard key={i} position={pos}>
          <Plane args={planeSize}>
            <meshStandardMaterial map={texture} />
          </Plane>
        </Billboard>
      ))}
    </group>
  );
}
