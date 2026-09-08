import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import * as Controls from "./controls";

const handleError = (error: unknown) => {
	console.error(error);
};

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#threejs") || undefined }); // attach to the canvas element in the HTML body
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x06162e);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

// creating lights
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

// loading 3d model
const loader = new GLTFLoader();
loader.load(
	"src/assets/vintage_cassete_deck.glb",
	gltf => {
		scene.add(gltf.scene);
		Controls.init(renderer, gltf.scene);
	},
	undefined,
	handleError,
);

camera.position.setZ(0.5);

// Start animating the scene
const animate = (time: DOMHighResTimeStamp) => {
	Controls.animate();
	renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);
