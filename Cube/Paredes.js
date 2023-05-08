import * as THREE from '../libs/three.module.js'

class Paredes extends THREE.Object3D {
	constructor() {
		super();
		this.dimensiones = 75;

		this.add(this.createEstructura());
	}

	createEstructura() {
		// El suelo es un Mesh, necesita una geometría y un material.
		// La geometría es una caja con muy poca altura
		var geometry = new THREE.BoxGeometry(this.dimensiones, 0.2, this.dimensiones);
		geometry.translate(0, -0.1, 0);

		// El material se hará con una textura de madera
		var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
		var material = new THREE.MeshPhongMaterial({ map: texture });

		// Ya se puede construir el Mesh
		var suelo = new THREE.Mesh(geometry, material);
		var pared_izq = suelo.clone();
		var pared_der = suelo.clone();
		var pared_trasera = suelo.clone();

		pared_izq.rotation.z = -Math.PI / 2;
		pared_izq.position.set(-this.dimensiones / 2, this.dimensiones / 2, 0);

		pared_der.rotation.z = Math.PI / 2;
		pared_der.position.set(this.dimensiones / 2, this.dimensiones / 2, 0);

		pared_trasera.rotation.x = Math.PI / 2;
		pared_trasera.position.set(0, this.dimensiones / 2, -this.dimensiones / 2);


		// Todas las figuras se crean centradas en el origen.
		// El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior

		// Que no se nos olvide añadirlo a la escena, que en este caso es  this
		var estructura = new THREE.Object3D();
		estructura.add(suelo);
		estructura.add(pared_izq);
		estructura.add(pared_der);
		estructura.add(pared_trasera);

		return estructura;
	}

	update() { }
}

export { Paredes };
