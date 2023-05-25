import * as THREE from '../libs/three.module.js'

class Lampara extends THREE.Object3D {
	constructor(material) {
		super();

		this.material = material;

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
		var miMaterial = this.material;

		this.latheObject = new THREE.Mesh(miObjeto, miMaterial);
		this.latheObject.scale.set(0.8, 0.8, 0.8);

		// añadimos la bombilla
		var geom = new THREE.SphereGeometry(0.6, 40, 40);
		this.bombilla = new THREE.Mesh(geom, miMaterial);

		// añadimos el objeto
		this.lampara = new THREE.Object3D();
		this.lampara.add(this.latheObject, this.bombilla);
		this.add(this.lampara);
	}

	setMaterial(material) {
		this.latheObject.material = material;
		this.bombilla.material = material;
	}

	update() { }
}

export { Lampara };
