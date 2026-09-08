import * as THREE from "three";

const SENSITIVITY = 0.003;
const DAMPING = 0.94;

let object: THREE.Object3D | null = null;
let isDragging = false;
let velocity = [0, 0];
let previous = [0, 0];

export const init = (renderer: THREE.WebGLRenderer, rotatingObject: THREE.Object3D) => {
	object = rotatingObject;
	const canvas = renderer.domElement;
	canvas.addEventListener("mousedown", startDragging);
	canvas.addEventListener("mouseup", stopDragging);
	canvas.addEventListener("mousemove", rotateObject);
};

export const animate = () => {
	if (!object) {
		return;
	}

	object.rotation.y += velocity[0];
	object.rotation.x += velocity[1];

	if (!isDragging) {
		velocity[0] *= DAMPING;
		velocity[1] *= DAMPING;
	}
};

const rotateObject = (event: MouseEvent) => {
	if (!isDragging) {
		return;
	}

	velocity = [(event.clientX - previous[0]) * SENSITIVITY, (event.clientY - previous[1]) * SENSITIVITY];
	previous = [event.clientX, event.clientY];
};

const startDragging = (event: MouseEvent) => {
	isDragging = true;
	previous = [event.clientX, event.clientY];
};

const stopDragging = () => {
	isDragging = false;
};
