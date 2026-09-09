import * as THREE from "three";

const SENSITIVITY = 0.003;
const DAMPING = 0.94;
const ZOOM_SENSITIVITY = 0.00005;
const ZOOM_DAMPING = 0.95;
const MIN_ZOOM = 0.38;
const MAX_ZOOM = 2.5;

let camera: THREE.Camera | null = null;
let object: THREE.Object3D | null = null;
let isDragging = false;
let objectVelocity = [0, 0];
let previousMouse = [0, 0];
let zoomVelocity = 0;

export const init = (renderer: THREE.WebGLRenderer, zoomingCamera: THREE.Camera, rotatingObject: THREE.Object3D) => {
	camera = zoomingCamera;
	object = rotatingObject;

	const canvas = renderer.domElement;
	canvas.addEventListener("mousedown", startDragging);
	canvas.addEventListener("mouseup", stopDragging);
	canvas.addEventListener("mousemove", rotateObject);
	canvas.addEventListener("wheel", zoomCamera, { passive: false });
};

export const animate = () => {
	if (!object || !camera) {
		console.error("Must set rotating object and camera.");
		return;
	}

	object.rotation.y += objectVelocity[0];
	object.rotation.x += objectVelocity[1];

	if (!isDragging) {
		objectVelocity[0] *= DAMPING;
		objectVelocity[1] *= DAMPING;
	}

	camera.position.z += zoomVelocity;
	camera.position.z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, camera.position.z));
	zoomVelocity *= ZOOM_DAMPING;
};

const zoomCamera = (event: WheelEvent) => {
	event.preventDefault();
	zoomVelocity += event.deltaY * ZOOM_SENSITIVITY;
};

const rotateObject = (event: MouseEvent) => {
	if (!isDragging) {
		return;
	}

	objectVelocity = [
		(event.clientX - previousMouse[0]) * SENSITIVITY,
		(event.clientY - previousMouse[1]) * SENSITIVITY,
	];
	previousMouse = [event.clientX, event.clientY];
};

const startDragging = (event: MouseEvent) => {
	isDragging = true;
	previousMouse = [event.clientX, event.clientY];
};

const stopDragging = () => {
	isDragging = false;
};
