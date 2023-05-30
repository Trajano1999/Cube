import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Paredes extends THREE.Object3D {
	constructor() {
		super();

		// variables
		this.dimension_suelo = 75;
		this.dimension_pared = 50;

		// creamos el suelo y techo
		var geometry_suelo = new THREE.BoxGeometry(this.dimension_suelo, 0.2, this.dimension_suelo);
		geometry_suelo.translate(0, -0.1, 0);
		var texture = new THREE.TextureLoader().load('../imgs/estuco.jpg');
		var material = new THREE.MeshPhongMaterial({ map: texture });
		var techo = new THREE.Mesh(geometry_suelo, material);
		techo.position.set(0, 50, 0);

		// construimos las paredes
		var geometry_paredes = new THREE.BoxGeometry(this.dimension_suelo, 0.2, this.dimension_pared);
		this.pared_izq = new THREE.Mesh(geometry_paredes, material);
		this.pared_trasera = this.pared_izq.clone();

		this.pared_izq.rotation.z = -Math.PI / 2;
		this.pared_izq.rotation.x = -Math.PI / 2;
		this.pared_izq.position.set(-this.dimension_suelo / 2, this.dimension_pared / 2, 0);

		var geometria_trozo_1 = new THREE.BoxGeometry(this.dimension_suelo / 2, this.dimension_pared, 0.2);
		geometria_trozo_1.translate(-this.dimension_suelo / 4, this.dimension_pared / 2, 0);
		var geometria_trozo_2 = new THREE.BoxGeometry(10, this.dimension_pared - 20, 0.2);
		geometria_trozo_2.translate(5, 20 + (this.dimension_pared - 20) / 2, 0);
		var geometria_trozo_3 = new THREE.BoxGeometry(this.dimension_suelo / 2 - 10, this.dimension_pared, 0.2);
		geometria_trozo_3.translate((this.dimension_suelo / 2 + 10) / 2, this.dimension_pared / 2, 0);

		this.trozo1 = new THREE.Mesh(geometria_trozo_1, material);
		this.trozo1.rotation.y = -Math.PI / 2;
		this.trozo1.position.x = this.dimension_suelo / 2;

		this.trozo2 = new THREE.Mesh(geometria_trozo_2, material);
		this.trozo2.rotation.y = -Math.PI / 2;
		this.trozo2.position.x = this.dimension_suelo / 2;

		this.trozo3 = new THREE.Mesh(geometria_trozo_3, material);
		this.trozo3.rotation.y = -Math.PI / 2;
		this.trozo3.position.x = this.dimension_suelo / 2;

		this.pared_trasera.rotation.x = Math.PI / 2;
		this.pared_trasera.position.set(0, this.dimension_pared / 2, -this.dimension_suelo / 2);

		this.pared_delantera = this.pared_trasera.clone();
		this.pared_delantera.position.z += this.dimension_suelo;

		// Que no se nos olvide añadirlo a la escena, que en este caso es  this
		var estructura = new THREE.Object3D();
		estructura.add(this.pared_izq);
		estructura.add(this.trozo1);
		estructura.add(this.trozo2);
		estructura.add(this.trozo3);
		estructura.add(this.pared_trasera);
		estructura.add(techo);
		estructura.add(this.pared_delantera);
		this.add(estructura);
	}

	update() { }
}

export { Paredes };
