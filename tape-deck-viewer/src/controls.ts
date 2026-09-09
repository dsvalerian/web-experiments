import * as THREE from "three";

const SENSITIVITY = 0.2;
const ROTATE_HALF_LIFE = 0.05;
const ZOOM_SENSITIVITY = 0.01;
const ZOOM_HALF_LIFE = 0.05;
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
	canvas.addEventListener("pointerdown", event => startDragging(event, canvas));
	canvas.addEventListener("pointerup", stopDragging);
	canvas.addEventListener("pointermove", rotateObject);
	canvas.addEventListener("wheel", zoomCamera, { passive: false });
};

export const animate = (delta: number) => {
	if (!object || !camera) {
		return;
	}

	object.rotation.y += objectVelocity[0] * delta;
	object.rotation.x += objectVelocity[1] * delta;

	const dampMultiplier = Math.pow(0.5, delta / ROTATE_HALF_LIFE);
	objectVelocity[0] *= dampMultiplier;
	objectVelocity[1] *= dampMultiplier;

	camera.position.z += zoomVelocity * delta;
	camera.position.z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, camera.position.z));
	zoomVelocity *= Math.pow(0.5, delta / ZOOM_HALF_LIFE);
};

const zoomCamera = (event: WheelEvent) => {
	event.preventDefault();
	zoomVelocity += event.deltaY * ZOOM_SENSITIVITY;
};

const rotateObject = (event: PointerEvent) => {
	if (!isDragging) {
		return;
	}

	objectVelocity = [
		(event.clientX - previousMouse[0]) * SENSITIVITY,
		(event.clientY - previousMouse[1]) * SENSITIVITY,
	];
	previousMouse = [event.clientX, event.clientY];
};

const startDragging = (event: PointerEvent, canvas: HTMLCanvasElement) => {
	canvas.setPointerCapture(event.pointerId);
	isDragging = true;
	previousMouse = [event.clientX, event.clientY];
};

const stopDragging = () => {
	isDragging = false;
};
