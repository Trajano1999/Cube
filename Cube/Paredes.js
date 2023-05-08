import * as THREE from '../libs/three.module.js'

class Paredes extends THREE.Object3D {
	constructor() {
		super();

		// variables
		this.dimension_suelo = 75;
		this.dimension_pared = 50;

		// creamos el suelo y techo
		var geometry_suelo = new THREE.BoxGeometry(this.dimension_suelo, 0.2, this.dimension_suelo);
		geometry_suelo.translate(0, -0.1, 0);
		var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
		var material = new THREE.MeshPhongMaterial({ map: texture });
		var suelo = new THREE.Mesh(geometry_suelo, material);
		var techo = suelo.clone();
		techo.position.set(0, 50, 0);

		// construimos las paredes
		var geometry_paredes = new THREE.BoxGeometry(this.dimension_suelo, 0.2, this.dimension_pared);
		var pared_izq = new THREE.Mesh(geometry_paredes, material);
		var pared_der = pared_izq.clone();
		var pared_trasera = pared_izq.clone();

		pared_izq.rotation.z = -Math.PI / 2;
		pared_izq.rotation.x = -Math.PI / 2;
		pared_izq.position.set(-this.dimension_suelo / 2, this.dimension_pared / 2, 0);

		pared_der.rotation.z = Math.PI / 2;
		pared_der.rotation.x = -Math.PI / 2;
		pared_der.position.set(this.dimension_suelo / 2, this.dimension_pared / 2, 0);

		pared_trasera.rotation.x = Math.PI / 2;
		pared_trasera.position.set(0, this.dimension_pared / 2, -this.dimension_suelo / 2);

		// Que no se nos olvide añadirlo a la escena, que en este caso es  this
		var estructura = new THREE.Object3D();
		estructura.add(suelo);
		estructura.add(pared_izq);
		estructura.add(pared_der);
		estructura.add(pared_trasera);
		estructura.add(techo);
		this.add(estructura);
	}

	update() { }
}

export { Paredes };
