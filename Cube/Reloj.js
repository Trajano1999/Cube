import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Reloj extends THREE.Object3D {
	constructor() {
		super();

		var profundidad_cuadrado = 4;
		var profundidad_reloj = 0.1;

		this.clock = new THREE.Clock();

		var geometria_cuadrado = new THREE.BoxGeometry(10, 10, profundidad_cuadrado);
		geometria_cuadrado.translate(0, 0, -profundidad_cuadrado / 2 - profundidad_reloj);
		var material_cuadrado = new THREE.MeshPhongMaterial({ color: 0x3C270E });
		this.cuadrado = new THREE.Mesh(geometria_cuadrado, material_cuadrado);

		var geometria_reloj = new THREE.CylinderGeometry(4, 4, profundidad_reloj, 30);
		geometria_reloj.rotateX(Math.PI / 2);
		geometria_reloj.translate(0, 0, -profundidad_reloj / 2);
		var loader = new THREE.TextureLoader();
		var textura_reloj = loader.load('../imgs/reloj_2.jpg');
		textura_reloj.center.set(0.5, 0.5);
		textura_reloj.rotation = Math.PI / 2;
		var material_reloj = new THREE.MeshPhongMaterial({ map: textura_reloj });

		this.reloj = new THREE.Mesh(geometria_reloj, material_reloj);

		var geometria_aguja_grande = new THREE.CylinderGeometry(0.1, 0.1, 3, 20);
		geometria_aguja_grande.translate(0, 3 / 2, 0.1 / 2);
		var geometria_aguja_pequeña = new THREE.CylinderGeometry(0.1, 0.1, 2, 20);
		geometria_aguja_pequeña.translate(0, 2 / 2, 0.1 / 2);
		var material_agujas = new THREE.MeshPhongMaterial({ color: 0x000000 });
		this.aguja_grande = new THREE.Mesh(geometria_aguja_grande, material_agujas);
		this.aguja_pequeña = new THREE.Mesh(geometria_aguja_pequeña, material_agujas);

		var geometria_palo_pendulo = new THREE.CylinderGeometry(0.5, 0.5, 7, 4);
		geometria_palo_pendulo.translate(0, -7 / 2, 0);
		var material_palo_pendulo = new THREE.MeshPhongMaterial({ color: 0x808080 });
		this.palo_pendulo = new THREE.Mesh(geometria_palo_pendulo, material_palo_pendulo);

		var geometria_circulo_pendulo = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 30);
		geometria_circulo_pendulo.rotateX(Math.PI / 2);
		geometria_circulo_pendulo.translate(0, -7 - 1.5 / 2, 0);
		this.circulo_pendulo = new THREE.Mesh(geometria_circulo_pendulo, material_palo_pendulo);

		this.rotacion_pendulo = new THREE.Object3D();
		this.rotacion_pendulo.add(this.circulo_pendulo);
		this.rotacion_pendulo.add(this.palo_pendulo);
		this.rotacion_pendulo.position.set(0, -5, -4 / 2 - 0.1);

		this.add(this.cuadrado);
		this.add(this.reloj);
		this.add(this.aguja_grande);
		this.add(this.aguja_pequeña);
		this.add(this.rotacion_pendulo);

		var origen = { t: -Math.PI / 2 };
		var destino = { t: Math.PI / 2 };
		var tiempoRecorrido1 = 1500;

		var movimiento1 = new TWEEN.Tween(origen)
			.to(destino, tiempoRecorrido1)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(() => {
				this.rotacion_pendulo.rotation.z = origen.t;
			})
			.onComplete(() => { origen.t = 0 })
			.repeat(Infinity)
			.yoyo(true)
			.start();
	}

	update() {
		var segundos_transcurridos = this.clock.getDelta();
		this.aguja_pequeña.rotation.z -= (1 / 60 * Math.PI / 30 * segundos_transcurridos);
		this.aguja_grande.rotation.z -= (Math.PI / 30 * segundos_transcurridos);
	}
}

export { Reloj };


