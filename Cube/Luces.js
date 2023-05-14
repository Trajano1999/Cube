import * as THREE from '../libs/three.module.js'

class BotonLuces extends THREE.Object3D {
	constructor() {
		super();

		this.pickableObjects = [];

		var geometria_boton = new THREE.CylinderGeometry(1, 1, 1, 20);
		geometria_boton.rotateZ(Math.PI / 2);
		geometria_boton.translate(0, 2 / 2, 0);
		var material_boton = new THREE.MeshPhongMaterial({ color: 0x8c004b });
		this.boton = new THREE.Mesh(geometria_boton, material_boton);

		this.pickableObjects.push(this.boton);

		this.add(this.boton);
	}

	update() { }

	getPickableObjects() {
		return this.pickableObjects;
	}
}

export { BotonLuces };
