import "./style.css";
import * as THREE from "three";
import * as Cube from "./cube.js";

// Setting up threejs
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#threejs") });
renderer.setSize(window.innerHeight, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000);

const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
camera.position.setZ(2);

Cube.init(renderer, scene);

// Start rendering
const timer = new THREE.Timer();
renderer.setAnimationLoop(timestamp => {
	timer.update();
	const delta = timer.getDelta();
	Cube.animate(delta);
	renderer.render(scene, camera);
});
