// App.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { PointCloudMedia } from './PointCloudMedia';
import "./App.css"

// URL to a free GLTF model
const MODEL_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BarramundiFish/glTF-Binary/BarramundiFish.glb';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={['#151518']} />
      <ambientLight intensity={Math.PI} />
      <pointLight position={[10, 10, 10]} intensity={3} />
      <Suspense fallback={null}>
        <PointCloudMedia modelUrl={MODEL_URL} count={100} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

// Preload the model so it's ready for both components
useGLTF.preload(MODEL_URL);

export default App;
