import * as THREE from '../libs/three.module.js'

class Cubos extends THREE.Object3D {
	constructor() {
		super();

		this.dimension = 3;

		this.pickableObjects = [];

		var material1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });	//cubo rojo
		var material2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });	//cubo verde
		var material3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });	//cubo azul
		

		this.cubo1 = new Cubo(1, material1);
		this.cubo2 = new Cubo(2, material2);
		this.cubo3 = new Cubo(3, material3);

		this.cubo1.position.set(-this.dimension, 0, this.dimension);
		this.cubo2.position.set(this.dimension, 0, 0);
		this.cubo3.position.set(-this.dimension, 0, -this.dimension);

		this.pickableObjects.push(this.cubo1);
		this.pickableObjects.push(this.cubo2);
		this.pickableObjects.push(this.cubo3);

		this.add(this.cubo1);
		this.add(this.cubo2);
		this.add(this.cubo3);


	}

	update() { 
		/*
		if (this.cubo1.getBoundingBox().intersectsBox(this.cubo2.getBoundingBox())) {
			this.cubo1.position.y = this.cubo2.position.y + this.dimension;
		}
		if (this.cubo1.getBoundingBox().intersectsBox(this.cubo3.getBoundingBox())) {
			this.cubo1.position.y = this.cubo3.position.y + this.dimension;
		}
		if (this.cubo2.getBoundingBox().intersectsBox(this.cubo3.getBoundingBox())) {
			this.cubo2.position.y = this.cubo3.position.y + this.dimension;
		}*/
		

	}

	getPickableObjects(){
		return this.pickableObjects;
	}
}

class Cubo extends THREE.Object3D {
	constructor(id_cubo, material) {
		super();
		
		var dimension = 3;

		this.identificador_cubo = id_cubo;

		var geometria_cubo = new THREE.BoxGeometry(dimension, dimension, dimension);
		geometria_cubo.translate(0, dimension / 2, 0);

		this.cubo = new THREE.Mesh(geometria_cubo, material);
		this.cubo.userData = this;
		this.add(this.cubo);

		/*this.bounding_box = new THREE.Box3().setFromObject(this.cubo);

		this.cajaVisible = new THREE.Box3Helper(this.bounding_box, 0xFFFFFF);
		this.cajaVisible.visible = true;
		this.add(this.cajaVisible);*/

	}

	getIdCubo(){
		return this.identificador_cubo;
	}

	getBoundingBox(){
		//return this.bounding_box;
	}
}

export { Cubos };


