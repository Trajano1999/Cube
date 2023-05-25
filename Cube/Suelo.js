import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Suelo extends THREE.Object3D {
	constructor() {
		super();

		// variables
		this.dimension_suelo = 75;
		this.dimension_pared = 50;

		// creamos el suelo y techo
		var geometry_suelo = new THREE.BoxGeometry(this.dimension_suelo, 0.2, this.dimension_suelo);
		geometry_suelo.translate(0, -0.1, 0);
		var texture = new THREE.TextureLoader().load('../imgs/textura-suelo.jpg');
		var material = new THREE.MeshPhongMaterial({ map: texture });
		var suelo = new THREE.Mesh(geometry_suelo, material);
        this.add(suelo);
	}

	update() { }
}

export { Suelo };
