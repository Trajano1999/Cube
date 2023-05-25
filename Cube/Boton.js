import * as THREE from '../libs/three.module.js'

class Boton extends THREE.Object3D {
	constructor() {
		super();

		this.pickableObjects = [];

		var geometria_boton = new THREE.CylinderGeometry(2, 2, 1, 20);
		geometria_boton.rotateZ(Math.PI / 2);
		geometria_boton.translate(0, 2 / 2, 0);
		var loader = new THREE.TextureLoader();
		var text_boton = loader.load('../imgs/textura-dorada.jpg');

		var text_verde = loader.load('../imgs/textura-verde.jpg');
		var material_boton = new THREE.MeshPhongMaterial({ map: text_boton });
		this.material_verde = new THREE.MeshPhongMaterial({ map: text_verde });
		this.boton = new THREE.Mesh(geometria_boton, material_boton);

		this.pickableObjects.push(this.boton);
		this.add(this.boton);
	}

	update() {
		var material_nuevo = this.material_verde;
		this.boton.material = material_nuevo;
	}

	getPickableObjects() {
		return this.pickableObjects;
	}
}

export { Boton };
