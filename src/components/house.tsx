"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const Scene1: React.FC = () => {
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
    const initialCameraPosition = { x: 0, y: 50, z: 300 };
    const initialCameraVector = new THREE.Vector3(
        initialCameraPosition.x,
        initialCameraPosition.y,
        initialCameraPosition.z
    );

    useEffect(() => {
        if (!canvasRef.current) return;

        renderer.current = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        renderer.current.setClearColor(0xf5e2d8);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(100, 100, 100); // Position the light in the top-right corner
        scene.current.add(directionalLight);

        const loader1 = new GLTFLoader();
        loader1.load(
        "dae_diorama_-_forest_loner.glb",
        (gltf) => {
            const model1 = gltf.scene;
            model1.scale.set(10, 10, 10);
            model1.position.set(40, -20, 110); // Set the position of the first model
            scene.current.add(model1);
        },
        undefined,
        (error) => {
            console.error("Error loading GLTF model", error);
        }
        );

        camera.current.position.x = 0;
        camera.current.position.z = 300;
        camera.current.position.y = 50;

        const controls = new OrbitControls(camera.current, canvasRef.current!);
        controlsRef.current = controls;
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.target.set(0, 0, 0);
        controls.update();

        const createText = (
        text: string,
        position: THREE.Vector3,
        targetPosition: THREE.Vector3
        ) => {
        const fontLoader = new FontLoader();
        fontLoader.load(
            "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/fonts/helvetiker_regular.typeface.json",
            (font) => {
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: 5,
                height: 1,
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.copy(position); // Set the position of the text
            scene.current.add(textMesh);

            textMesh.addEventListener("click", () => {
                // Smoothly transition camera position to the target position
                const startPosition = camera.current.position.clone();
                const endPosition = targetPosition.clone();
                const duration = 1000; // milliseconds
                const startTime = Date.now();

                function animateCamera() {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                const t = Math.min(1, elapsedTime / duration);

                const newPosition = new THREE.Vector3().lerpVectors(
                    startPosition,
                    endPosition,
                    t
                );
                camera.current.position.copy(newPosition);

                if (t < 1) {
                    requestAnimationFrame(animateCamera);
                }
                }

                animateCamera();
            });
            }
        );
        };

        // Example texts with target camera positions
        createText(
        "1",
        new THREE.Vector3(70, 20, 100),
        new THREE.Vector3(100, 20, 110)
        );
        createText(
        "2",
        new THREE.Vector3(-60, 10, 180),
        new THREE.Vector3(-70, 30, 200)
        );
        createText(
        "3",
        new THREE.Vector3(0, 5, 180),
        new THREE.Vector3(-10, 10, 210)
        );
        createText(
        "4",
        new THREE.Vector3(10, 20, 120),
        new THREE.Vector3(50, 50, 50)
        );

        // Event listener for key presses
        const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case " ":
            transitionCamera(initialCameraVector);
            break;
            case "1":
            transitionCamera(new THREE.Vector3(100, 20, 110));
            break;
            case "2":
            transitionCamera(new THREE.Vector3(-70, 30, 200));
            break;
            case "3":
            transitionCamera(new THREE.Vector3(-10, 10, 210));
            break;
            case "4":
            transitionCamera(new THREE.Vector3(-0, 30, 150));
            break;
            // Add more cases for other keys if needed
            default:
            break;
        }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
        controls.dispose();
        renderer.current?.dispose();
        document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const animate = () => {
        requestAnimationFrame(animate);
        controlsRef.current?.update();
        renderer.current?.render(scene.current, camera.current);
        };

        animate();

        return () => {
        controlsRef.current?.dispose();
        renderer.current?.dispose();
        };
    }, []);

    const transitionCamera = (targetPosition: THREE.Vector3) => {
        const startPosition = camera.current.position.clone();
        const duration = 1000; // milliseconds
        const startTime = Date.now();

        function animateCamera() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const t = Math.min(1, elapsedTime / duration);

        const newPosition = new THREE.Vector3().lerpVectors(
            startPosition,
            targetPosition,
            t
        );
        camera.current.position.copy(newPosition);

        if (t < 1) {
            requestAnimationFrame(animateCamera);
        }
        }

        animateCamera();
    };

    return <canvas ref={canvasRef} />;
};

export default Scene1;
