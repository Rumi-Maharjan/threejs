"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Scene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls>();
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  const renderer = useRef<THREE.WebGLRenderer>();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const [frontView, setFrontView] = useState(false);
  const initialCameraPosition = { x: 0, y: 50, z: 300 };
  const audio = useRef<HTMLAudioElement>(
    new Audio("Peter Manos - In My Head.mp3")
  );
  const isAudioPlaying = useRef<boolean>(false);

  useEffect(() => {
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    // const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0xf5e2d8);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    if (!canvasRef.current) return;

    renderer.current = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setClearColor(0xf5e2d8);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 100, 100); // Position the light in the top-right corner
    scene.current.add(directionalLight);

    const loader1 = new GLTFLoader();
    loader1.load(
      "matilda.glb",
      (gltf) => {
        const model1 = gltf.scene;
        model1.rotation.set(0, -100, 0);
        model1.position.set(-300, 0, -150);
        model1.name = "matilda"; // Set the position of the first model
        scene.current.add(model1);
        model1.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData.onClick = () => {
              // Set onClick function for model1
              camera.current.position.set(
                initialCameraPosition.x,
                initialCameraPosition.y,
                initialCameraPosition.z
              );
              controlsRef.current?.target.set(-200, 50, 0);
              console.log("Camera Target:", controlsRef.current?.target);
              console.log(camera.current.position.x);
              console.log(camera.current.position.y);
              console.log(camera.current.position.z);
              // Calculate the direction vector from the current camera position to the target
              const cameraTarget = new THREE.Vector3(-200, 48, 0);
              const cameraPosition = camera.current.position.clone();
              const direction = new THREE.Vector3()
                .subVectors(cameraPosition, cameraTarget)
                .normalize();

              // Define the zoom speed and distance to zoom
              const zoomSpeed = 5;
              const zoomDistance = -70;

              // Zoom in along the direction vector
              camera.current.position.addScaledVector(
                direction,
                zoomDistance * zoomSpeed
              );
            };
          }
        });
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model", error);
      }
    );

    // Load the second model
    const loader2 = new GLTFLoader();
    loader2.load(
      "chonky_cat_trio.glb",
      (gltf) => {
        const model2 = gltf.scene;
        model2.scale.set(100, 100, 100);
        model2.position.set(0, 0, 100); // Set the position of the first model
        scene.current.add(model2);
        model2.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData.onClick = () => {
              // Set onClick function for model1
              camera.current.position.set(
                initialCameraPosition.x,
                initialCameraPosition.y,
                initialCameraPosition.z
              );
              controlsRef.current?.target.set(0, 0, 0);
              camera.current.position.z = 130;
              console.log("Camera Target:", controlsRef.current?.target);
              // Calculate the direction vector from the current camera position to the target
              const cameraTarget = new THREE.Vector3(0, 50, 0);
              const cameraPosition = camera.current.position.clone();
              const direction = new THREE.Vector3()
                .subVectors(cameraPosition, cameraTarget)
                .normalize();

              // Define the zoom speed and distance to zoom
              const zoomSpeed = -5;
              const zoomDistance = -15;

              // Zoom in along the direction vector
              camera.current.position.addScaledVector(
                direction,
                zoomDistance * zoomSpeed
              );
            };
          }
        });
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model", error);
      }
    );

    // Load the third model
    const loader3 = new GLTFLoader();
    loader3.load(
      "anya_forger_spy_x_family.glb",
      (gltf) => {
        const model3 = gltf.scene;
        model3.rotation.set(0, 100, 0);
        model3.position.set(300, 0, -50);
        model3.scale.set(130, 130, 130); // Set the position of the first model
        scene.current.add(model3);
        model3.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData.onClick = () => {
              // Set onClick function for model1
              camera.current.position.set(
                initialCameraPosition.x,
                initialCameraPosition.y,
                initialCameraPosition.z
              );
              controlsRef.current?.target.set(260, 50, 0);
              console.log("Camera Target:", controlsRef.current?.target);
              // Calculate the direction vector from the current camera position to the target
              const cameraTarget = new THREE.Vector3(260, 50, 0);
              const cameraPosition = camera.current.position.clone();
              const direction = new THREE.Vector3()
                .subVectors(cameraPosition, cameraTarget)
                .normalize();

              // Define the zoom speed and distance to zoom
              const zoomSpeed = 3;
              const zoomDistance = -125;

              // Zoom in along the direction vector
              camera.current.position.addScaledVector(
                direction,
                zoomDistance * zoomSpeed
              );
            };
          }
        });
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model", error);
      }
    );

    const loader4 = new GLTFLoader();
    loader4.load(
      "sony_walkman.glb",
      (gltf) => {
        const model4 = gltf.scene;
        model4.rotation.set(0, -50, 0);
        model4.position.set(-400, 0, -30);
        model4.scale.set(230, 230, 230); // Set the position of the first model
        model4.name = "model4";
        scene.current.add(model4);
        model4.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData.onClick = () => {
              // Set onClick function for model1
              camera.current.position.set(
                initialCameraPosition.x,
                initialCameraPosition.y,
                initialCameraPosition.z
              );
              controlsRef.current?.target.set(-360, 30, 0);
              console.log("Camera Target:", controlsRef.current?.target);
              // Calculate the direction vector from the current camera position to the target
              const cameraTarget = new THREE.Vector3(-360, 50, 0);
              const cameraPosition = camera.current.position.clone();
              const direction = new THREE.Vector3()
                .subVectors(cameraPosition, cameraTarget)
                .normalize();

              // Define the zoom speed and distance to zoom
              const zoomSpeed = 3;
              const zoomDistance = -130;

              // Zoom in along the direction vector
              camera.current.position.addScaledVector(
                direction,
                zoomDistance * zoomSpeed
              );
              if (isAudioPlaying.current) {
                audio.current.pause();
              } else {
                audio.current.play();
              }
              isAudioPlaying.current = !isAudioPlaying.current;
            };
          }
        });
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model", error);
      }
    );

    console.log("Initial Camera Position:", camera.current.position);

    const controls = new OrbitControls(camera.current, canvasRef.current!);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.target.set(0, 0, 0);
    controls.update();

    const handleSpaceKey = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setFrontView((prev) => !prev);
      } else if (event.code === "ArrowLeft") {
        camera.current.position.set(
          initialCameraPosition.x,
          initialCameraPosition.y,
          initialCameraPosition.z
        );
        controlsRef.current?.target.set(-150, 50, 0);
        console.log("Camera Target:", controlsRef.current?.target);
      }
    };
    window.addEventListener("keydown", handleSpaceKey);
    const handleMouseDown = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera.current);

      const intersects = raycaster.intersectObjects(
        scene.current.children,
        true
      );

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        if (intersectedObject.userData.onClick) {
          intersectedObject.userData.onClick();
        }
      }
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("keydown", handleSpaceKey);
      window.removeEventListener("mousedown", handleMouseDown);
      controls.dispose();
      renderer.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (frontView) {
      camera.current.position.set(-500, 200, -100);
      camera.current.lookAt(-300, 0, -300);
    } else {
      camera.current.position.set(0, 50, 300);
      camera.current.lookAt(0, 0, 0);
    }
  }, [frontView]);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      scene.current.traverse((child) => {
        if (child.name === "model4") {
          if (isAudioPlaying.current) {
            child.rotation.y += 0.01; // Rotate the model when audio is playing
          }
        }
      });

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      const model4 = scene.current.getObjectByName("model4");
      if (model4 && model4 instanceof THREE.Object3D) {
        const distance = camera.current.position.distanceTo(model4.position);
        const maxDistance = 1000; // Maximum distance
        const minDistance = -300; // Minimum distance
        const volume =
          1 -
          Math.min(
            1,
            Math.max(0, (distance - minDistance) / (maxDistance - minDistance))
          );
        audio.current.volume = volume;
      }

      controlsRef.current?.update();
      renderer.current?.render(scene.current, camera.current);
    };

    animate();

    // Clean up Three.js objects on unmount
    return () => {
      // geometry.dispose();
      // material.dispose();
      controlsRef.current?.dispose();
      renderer.current?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Scene;
