import * as THREE from '../libs/three.module.js'

class Cubos extends THREE.Object3D {
	constructor() {
		super();


		this.dimension = 3;
		this.pickableObjects = [];
		this.MAX_DISTANCIA_CHOQUE = 4;

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

		this.hayChoque1 = false;
		this.hayChoque2 = false;
		this.hayChoque3 = false;
		this.bajar1 = false;
		this.bajar2 = false;
		this.bajar3 = false;
		this.hesubido1 = false;
		this.hesubido2 = false;
		this.hesubido3 = false;
	}

	cambiarColor() {
		var nuevomaterial = new THREE.MeshPhongMaterial({ color: 0xff0080 });
		//var nuevomaterial = new THREE.MeshNormalMaterial();
		this.cubo1.setMaterial(nuevomaterial);
		this.cubo2.setMaterial(nuevomaterial);
		this.cubo3.setMaterial(nuevomaterial);
	}

	update() {
		if ((Math.abs(this.cubo1.position.x - this.cubo2.position.x) + (Math.abs(this.cubo1.position.z - this.cubo2.position.z))) < this.MAX_DISTANCIA_CHOQUE && this.cubo1.position.y == this.cubo2.position.y) {
			this.hayChoque1 = true;
		}

		if (this.hesubido1 && (Math.abs(this.cubo1.position.x - this.cubo2.position.x) + (Math.abs(this.cubo1.position.z - this.cubo2.position.z))) > this.MAX_DISTANCIA_CHOQUE && this.cubo1.position.y != this.cubo2.position.y) {
			this.bajar1 = true;
		}

		if ((Math.abs(this.cubo1.position.x - this.cubo3.position.x) + (Math.abs(this.cubo1.position.z - this.cubo3.position.z))) < this.MAX_DISTANCIA_CHOQUE && this.cubo1.position.y == this.cubo3.position.y) {
			this.hayChoque2 = true;
		}

		if (this.hesubido2 && (Math.abs(this.cubo1.position.x - this.cubo3.position.x) + (Math.abs(this.cubo1.position.z - this.cubo3.position.z))) > this.MAX_DISTANCIA_CHOQUE && this.cubo1.position.y != this.cubo3.position.y) {
			this.bajar2 = true;
		}


		if ((Math.abs(this.cubo2.position.x - this.cubo3.position.x) + (Math.abs(this.cubo2.position.z - this.cubo3.position.z))) < this.MAX_DISTANCIA_CHOQUE && this.cubo2.position.y == this.cubo3.position.y) {
			this.hayChoque3 = true;
		}

		if (this.hesubido3 && (Math.abs(this.cubo2.position.x - this.cubo3.position.x) + (Math.abs(this.cubo2.position.z - this.cubo3.position.z))) > this.MAX_DISTANCIA_CHOQUE && this.cubo2.position.y != this.cubo3.position.y) {
			this.bajar3 = true;
		}
	}

	getPickableObjects() {
		return this.pickableObjects;
	}
}

class Cubo extends THREE.Object3D {
	constructor(id_cubo, material) {
		super();

		var dimension = 3;
		this.puede_moverse = true;

		this.identificador_cubo = id_cubo;

		var geometria_cubo = new THREE.BoxGeometry(dimension, dimension, dimension);
		geometria_cubo.translate(0, dimension / 2, 0);

		this.cubo = new THREE.Mesh(geometria_cubo, material);
		this.cubo.userData = this;
		this.add(this.cubo);

	}

	getIdCubo() {
		return this.identificador_cubo;
	}

	getPuedeMoverse() {
		return this.puede_moverse;
	}

	setMaterial(material) {
		this.cubo.material = material;
	}
}

export { Cubos };


