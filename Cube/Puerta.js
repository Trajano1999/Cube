import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Puerta extends THREE.Object3D {
	constructor() {
		super();
		this.pickableObjects = [];

		// añadimos la puerta
		var geometria_puerta = new THREE.BoxGeometry(1, 20, 10);
		geometria_puerta.translate(0, 20 / 2, 0);
		var loader = new THREE.TextureLoader();
		var text_puerta = loader.load('../imgs/marmol-blanco.jpg');
		var material_puerta = new THREE.MeshPhongMaterial({ map: text_puerta });
		var puerta = new THREE.Mesh(geometria_puerta, material_puerta);

		// añadimos el pomo
		var geometria_pomo = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 20);
		geometria_pomo.rotateZ(Math.PI / 2);
		geometria_pomo.translate(0, 0.5 / 2, 0);
		var material_pomo = new THREE.MeshPhongMaterial({ color: 0x000000 });
		this.pomo = new THREE.Mesh(geometria_pomo, material_pomo);
		this.pomo.position.y = 10;
		this.pomo.position.z = 3;

		this.pickableObjects.push(this.pomo);

		// añadimos puerta general
		this.puerta = new THREE.Object3D();
		this.puerta.add(puerta, this.pomo);
		this.puerta.position.set(0, 0, 5);
		this.add(this.puerta);
	}

	update() {
		TWEEN.update();
	}

	animacion() {
		var origen = { t: 0 };
		var destino = { t: 1 };
		var tiempoRecorrido = 2 * 1000; // 2s

		var movimiento = new TWEEN.Tween(origen)
			.to(destino, tiempoRecorrido)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(() => {
				this.rotation.y = (Math.PI / 2) * origen.t;
			})
			.onComplete(() => {
				origen.t = 0;
			})

		movimiento.start();
	}

	getPickableObjects() {
		return this.pickableObjects;
	}
}

export { Puerta };
