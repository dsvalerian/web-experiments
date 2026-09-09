import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as Controls from "./controls";

const timer = new THREE.Timer();

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#threejs") || undefined, antialias: true }); // attach to the canvas element in the HTML body
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

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
		gltf.scene.rotation.x = 0.15;
		gltf.scene.rotation.y = -0.5;
		Controls.init(renderer, camera, gltf.scene);
	},
	undefined,
	error => console.error(error),
);

camera.position.setZ(0.6);

// Start animating the scene
renderer.setAnimationLoop(timestamp => {
	timer.update();
	const delta = timer.getDelta();
	Controls.animate(delta);
	renderer.render(scene, camera);
});
