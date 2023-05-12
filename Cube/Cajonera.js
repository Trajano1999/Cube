import * as THREE from '../libs/three.module.js'

class Cajonera extends THREE.Object3D {
	constructor() {
		super();

		// creamos los cajones
		var cajonGeom = new THREE.BoxGeometry(12, 2, 8);
		var cajonMat1 = new THREE.MeshPhongMaterial({ color: 0xB3640B });
		var cajonMat2 = new THREE.MeshPhongMaterial({ color: 0x8C510E });
		var cajon1 = new THREE.Mesh(cajonGeom, cajonMat1);
		var cajon2 = new THREE.Mesh(cajonGeom, cajonMat2);
		var cajon3 = cajon1.clone();
		var cajon4 = cajon2.clone();
		cajon1.position.y = 1;
		cajon2.position.y = 3;
		cajon3.position.y = 5;
		cajon4.position.y = 7;

		// añadimos el pomo
		var pomoGeom = new THREE.SphereGeometry(0.25, 15, 15);

		var pomo1 = new THREE.Mesh(pomoGeom, cajonMat2);
		pomo1.position.set(0, 1, 4);
		var pomo2 = new THREE.Mesh(pomoGeom, cajonMat1);
		pomo2.position.set(0, 3, 4);
		var pomo3 = pomo1.clone();
		pomo3.position.set(0, 5, 4);
		var pomo4 = pomo2.clone();
		pomo4.position.set(0, 7, 4);

		// añadimos el armario
		var armario = new THREE.Object3D();
		armario.add(cajon1, cajon2, cajon3, cajon4, pomo1, pomo2, pomo3, pomo4);
		this.add(armario);
	}

	update() { }
}

export { Cajonera };
