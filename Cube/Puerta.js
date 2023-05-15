import * as THREE from '../libs/three.module.js'

class Puerta extends THREE.Object3D {
	constructor() {
		super();
		this.pickableObjects = [];

		// añadimos la puerta
		var geometria_puerta = new THREE.BoxGeometry(1, 20, 10);
		geometria_puerta.translate(0, 20 / 2, 0);
		var material_puerta = new THREE.MeshPhongMaterial({ color: 0x808080 });
		var puerta = new THREE.Mesh(geometria_puerta, material_puerta);
		this.add(puerta);

		// añadimos el pomo
		var geometria_pomo = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 20);
		geometria_pomo.rotateZ(Math.PI / 2);
		geometria_pomo.translate(0, 0.5 / 2, 0);
		var material_pomo = new THREE.MeshPhongMaterial({ color: 0x000000 });
		this.pomo = new THREE.Mesh(geometria_pomo, material_pomo);
		this.pomo.position.y = 10;
		this.pomo.position.z = 3;

		this.pickableObjects.push(this.pomo);

		this.puerta = new THREE.Object3D();
		this.puerta.add(puerta, this.pomo);
		this.add(this.puerta);
	}

	update(cerrada) {
		if (!cerrada) {
			this.rotateY(Math.PI / 2);
		} else
			this.rotateY(-Math.PI / 2);
	}

	getPickableObjects() {
		return this.pickableObjects;
	}
}

export { Puerta };
