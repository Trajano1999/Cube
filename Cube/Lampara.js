import * as THREE from '../libs/three.module.js'

class Lampara extends THREE.Object3D {
	constructor() {
		super();

        // añadimos el resto de la lata
		var points = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(2, 0, 0),
			new THREE.Vector3(3, 1, 0),
			new THREE.Vector3(3, 8, 0),
			new THREE.Vector3(2.5, 8.4, 0),
			new THREE.Vector3(2.5, 8.5, 0),
			new THREE.Vector3(2.4, 8.5, 0),
			new THREE.Vector3(2.4, 8.1, 0),
			new THREE.Vector3(0, 8.1, 0),
		];

		var miObjeto = new THREE.LatheGeometry(points, 50, 0, 2 * Math.PI);
		var miMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
		miMaterial.side = THREE.DoubleSide;
		miMaterial.flatShading = true;
		miMaterial.needsUpdate = true;

		this.latheObject = new THREE.Mesh(miObjeto, miMaterial);
		//this.latheObject.scale.set(0.2, 0.2, 0.2);
		this.add(this.latheObject);
	}

	update() { }
}

export { Lampara };
