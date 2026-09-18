import * as THREE from "three";

const SPEED = 0.5;
const SCALE = 0.25;
const DENSITY = 4;
const CHAR = "?";

let spriteGroup = null;

export const init = (renderer, scene) => {
	spriteGroup = createSpriteGroup(CHAR, DENSITY, SCALE);
	scene.add(spriteGroup);
};

export const animate = delta => {
	if (spriteGroup != null) {
		spriteGroup.rotation.y += SPEED * delta;
	}
};

const createSpriteGroup = (char, density, scale) => {
	const sprites = new THREE.Group();
	const geometry = new THREE.BoxGeometry(1, 1, 1, density, density, density);
	const positions = geometry.attributes.position;

	const charTexture = createCharTexture(char);
	const charSpriteMaterial = new THREE.SpriteMaterial({ map: charTexture });
	for (let i = 0; i < positions.count; i++) {
		const sprite = new THREE.Sprite(charSpriteMaterial);
		sprite.position.set(positions.getX(i), positions.getY(i), positions.getZ(i));
		sprite.scale.set(scale, scale, scale);
		sprites.add(sprite);
	}

	return sprites;
};

const createCharTexture = char => {
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = 1024;
	const image = canvas.getContext("2d");
	image.fillStyle = "#fff";
	image.font = "300 256px monospace";
	image.fillText(char, canvas.width / 2, canvas.height / 2);
	return new THREE.CanvasTexture(canvas);
};
