// App.jsx (Updated)
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PointCloudMedia } from './PointCloudMedia';
import "./App.css"

const MODEL_URL = "./block_shape_abstract.glb";

let myMedia = [
  { src: "./sample.mp4" },
];

for (let i=0; i<1000; i++) {
  myMedia.push({ src: "./sample.mp4" });
}

function App() {
  return (
    <Canvas camera={{ position: [0, 1.5, 7], fov: 50 }}>
      <color attach="background" args={['#151518']} />
      <ambientLight intensity={Math.PI} />
      <pointLight position={[10, 10, 10]} intensity={3} />
      <Suspense fallback={null}>
        <PointCloudMedia modelUrl={MODEL_URL} media={myMedia} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
