import React, { useRef, useEffect } from 'react';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const UniversalModel = ({ modelname, position, rotation, scale }) => {
    const gltf = useLoader(GLTFLoader, `./model/${modelname}/scene.gltf`);
    gltf.scene.position.set(position.x, position.y, position.z);
    gltf.scene.rotation.x = rotation.x;
    gltf.scene.rotation.y = rotation.y;
    gltf.scene.rotation.z = rotation.z;

    return (
        <>
            <primitive object={gltf.scene} scale={scale} />
        </>
    );
};
export default UniversalModel;