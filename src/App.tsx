import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { InstancedMedia } from "./InstancedMedia";
import "./App.css"

function App() {
  const media = [
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.png", width: 1920, height: 1080},
    {src: "test.mp4", width: 1920, height: 1080, isVideo: true},
    {src: "test.mp4", width: 1920, height: 1080, isVideo: true},
    {src: "test.mp4", width: 1920, height: 1080, isVideo: true},
    {src: "test.mp4", width: 1920, height: 1080, isVideo: true},
    {src: "test.mp4", width: 1920, height: 1080, isVideo: true},
    {src: "test.mp4", width: 1920, height: 1080, isVideo: true},
    {src: "test.mp4", width: 1920, height: 1080, isVideo: true},
  ]

  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={Math.PI} />
      <InstancedMedia media={media} />
      <OrbitControls />
    </Canvas>
  )
}

export default App
