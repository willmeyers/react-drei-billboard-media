// usePointCloudData.jsx (New file)
import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function usePointCloudData(modelUrl, count) {
  const { scene } = useGLTF(modelUrl);

  return useMemo(() => {
    // ... all the logic from the previous step ...
    // It finds the targetMesh, samples vertices, and returns an array of positions.
    // This code does not need to change.
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

    if (!targetMesh) return [];
    
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
