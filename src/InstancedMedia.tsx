import * as three from "three";
import { Billboard, useTexture, useVideoTexture } from "@react-three/drei";
import { Suspense, useMemo } from "react";


export const ImageMaterial = ({ src }: { src: string }) => {
  const texture = useTexture(src);
  texture.wrapS = texture.wrapT = three.ClampToEdgeWrapping;

  return (
    <meshBasicMaterial map={texture} toneMapped={false} />
  )
}

export const VideoMaterial = ({ src }: { src: string }) => {
  const texture = useVideoTexture(src);
  texture.wrapS = texture.wrapT = three.ClampToEdgeWrapping;

  return (
    <meshBasicMaterial map={texture} toneMapped={false} />
  );
}

export const MediaPlane = ({
  src,
  width,
  height,
  isVideo,
  ...props
}: {
  src: string,
  width: number,
  height: number
  isVideo?: boolean,
  props: any
}) => {
  const scale = useMemo(() => {
    const a = width / height;
    if (a > 1) return [1, 1 / a, 1];

    return [a, 1, 1];
  }, [width, height]);

  return (
    <mesh {...props} scale={scale}>
      <planeGeometry />
      {isVideo ? <VideoMaterial src={src} /> : <ImageMaterial src={src} />}
    </mesh>
  )
}

const calculateCircleLayout = (count, radius) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    positions.push([x, 0, z]);
  }
  return positions;
};

export const InstancedMedia = (
  { media }: { media: any[] }
) => {
  const positions = useMemo(() => {
    return calculateCircleLayout(media.length, 5)
  }, [media])

  return (
    <group>
      <Suspense fallback={null}>
        {media.map((item, i) => (
          <Billboard key={i} position={positions[i]}>
            <MediaPlane
              {...item}
            />
          </Billboard>
        ))}
      </Suspense>
    </group>
  );
}
