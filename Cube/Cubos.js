import * as THREE from '../libs/three.module.js'

class Cubos extends THREE.Object3D {
	constructor() {
		super();

		this.dimension = 3;

		var geometria_cubo = new THREE.BoxGeometry(this.dimension, this.dimension, this.dimension);
		geometria_cubo.translate(0, this.dimension / 2, 0);
		var material1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
		var material2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
		var material3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });

		this.cubo1 = new THREE.Mesh(geometria_cubo, material1);
		this.cubo2 = new THREE.Mesh(geometria_cubo, material2);
		this.cubo3 = new THREE.Mesh(geometria_cubo, material3);

		this.cubo1.position.set(-this.dimension, 0, this.dimension);
		this.cubo2.position.set(this.dimension, 0, 0);
		this.cubo3.position.set(-this.dimension, 0, -this.dimension);

		this.add(this.cubo1);
		this.add(this.cubo2);
		this.add(this.cubo3);
	}

	update() { }
}

export { Cubos };


