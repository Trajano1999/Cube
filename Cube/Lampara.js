import * as THREE from '../libs/three.module.js'

class Lampara extends THREE.Object3D {
	constructor() {
		super();

		// añadimos la lámpara
		var points = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(5, 0, 0),
			new THREE.Vector3(5, 1, 0),
			new THREE.Vector3(1, 5, 0),
			new THREE.Vector3(1, 10, 0),
			new THREE.Vector3(2, 11, 0),
			new THREE.Vector3(0, 11, 0),
		];

		var miObjeto = new THREE.LatheGeometry(points, 100, 0, 2 * Math.PI);
		var miMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
		miMaterial.side = THREE.DoubleSide;
		miMaterial.flatShading = true;
		miMaterial.needsUpdate = true;

		var latheObject = new THREE.Mesh(miObjeto, miMaterial);
		latheObject.scale.set(0.8, 0.8, 0.8);

		// añadimos la bombilla
		var geom = new THREE.SphereGeometry(0.6, 40, 40);
		var bombilla = new THREE.Mesh(geom, miMaterial);

		// añadimos el objeto
		this.lampara = new THREE.Object3D();
		this.lampara.add(latheObject, bombilla);
		this.add(this.lampara);
	}

	update() { }
}

export { Lampara };
