import React from 'react';
import { Billboard } from '@react-three/drei';
import { usePointCloudData } from './usePointCloudData';
import { MediaPlane } from './MediaPlane';

export function PointCloudMedia({ modelUrl, media }) {
  const count = media.length;
  const positions = usePointCloudData(modelUrl, count);
  
  const aspect = 16 / 9;
  const height = 0.8;
  const planeSize = [height * aspect, height];

  return (
    <group
      rotation={[0, Math.PI / 2, 0]}
    >
      {media.map((mediaItem, i) => {
        const position = positions[i];

        if (!position) return null;

        return (
          <Billboard key={`${mediaItem.src}-${i}`} position={position}>
            <MediaPlane src={mediaItem.src} size={planeSize} />
          </Billboard>
        );
      })}
    </group>
  );
}
