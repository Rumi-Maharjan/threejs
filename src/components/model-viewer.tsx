"use client";

import React, { useEffect, useRef } from "react";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber"; // Importing useLoader and useFrame
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Mesh } from "three";

extend({ OrbitControls });

const ModelViewer: React.FC = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100%", backgroundColor: "#f5e2d8" }}
    >
      <EthereumModel />
      <AdditionalModel1 position={[-200, 0, -100]} />
      <AdditionalModel2 position={[100, 0, -50]} />
    </Canvas>
  );
};

const EthereumModel: React.FC = () => {
  const myModel = useLoader(GLTFLoader, "/scene1.gltf");
  const modelRef = useRef<Mesh>();
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls>();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.target.set(0, 0, 0);
    controls.update();

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();

      // Update min and max distances dynamically
      const distance = camera.position.distanceTo(controlsRef.current.target);
      controlsRef.current.minDistance = Math.min(2, distance / 2);
      controlsRef.current.maxDistance = Math.max(10, distance * 2);
    }
  });

  return (
    <>
      <pointLight position={[-100, -100, -100]} intensity={5000} />
      <pointLight position={[10, 100, 100]} intensity={10000} />
      <primitive object={myModel.scene} ref={modelRef} />
    </>
  );
};

// Define the type for the position prop
interface PositionProps {
  position: [number, number, number];
}

const AdditionalModel1: React.FC<PositionProps> = ({ position }) => {
  const additionalModel = useLoader(GLTFLoader, "/matilda.glb");
  const modelRef = useRef<Mesh>();
  const { camera } = useThree();

  const handleClick = () => {
    if (modelRef.current && camera) {
      const distance = 10; // Adjust as needed
      camera.position.copy(modelRef.current.position);
      camera.position.addScaledVector(
        camera.position.clone().sub(modelRef.current.position),
        distance
      );
      camera.lookAt(
        modelRef.current.position.x,
        modelRef.current.position.y,
        modelRef.current.position.z
      );
    }
  };

  return (
    <group scale={[0.5, 0.5, 0.5]} onClick={handleClick}>
      <primitive
        object={additionalModel.scene}
        ref={modelRef}
        position={position}
      />
    </group>
  );
};

const AdditionalModel2: React.FC<PositionProps> = ({ position }) => {
  const additionalModel = useLoader(GLTFLoader, "/scene.glb");
  const modelRef = useRef<Mesh>();
  const { camera } = useThree();

  const handleClick = () => {
    if (modelRef.current && camera) {
      const distance = 10; // Adjust as needed
      camera.position.copy(modelRef.current.position);
      camera.position.addScaledVector(
        camera.position.clone().sub(modelRef.current.position),
        distance
      );
      camera.lookAt(
        modelRef.current.position.x,
        modelRef.current.position.y,
        modelRef.current.position.z
      );
    }
  };

  return (
    <primitive
      object={additionalModel.scene}
      ref={modelRef}
      position={position}
      onClick={handleClick}
    />
  );
};

export { ModelViewer };
