// components/ThreeDModelCanvas.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Center } from '@react-three/drei';
import UniversalModel from './UniversalModel';
import { Suspense } from "react";
import { useColorMode } from '@chakra-ui/react';
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(2)} % loaded</Html>
}
const ThreeDModelCanvas = ({ modelname,position={x: 0, y: 0, z: 0}, rotation={x: 0, y: 0, z: 0}, scale, pos=[0,0,0] }) => {
  const { colorMode } = useColorMode();
  const preset = colorMode === 'dark' ? 'night' : 'dawn';
return(
 <Canvas style={{ borderRadius: "20px", height: "300px", width: "300px" }} shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
    <pointLight position={[10, 10, 10]} />
    <Suspense fallback={<Loader />}>
      <group position={pos}>
        
          <Center >
            <UniversalModel
              modelname={modelname}
              position={position}
              rotation={rotation}
              scale={scale}
            />
          </Center>
       
      </group>
      <Environment preset={preset} background blur={0.5} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} 
     
        />
    </Suspense>
  </Canvas>
)};

export default ThreeDModelCanvas;
