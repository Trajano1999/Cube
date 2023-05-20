import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Reloj extends THREE.Object3D {
	constructor() {
		super();

		var profundidad_cuadrado = 4;
		var profundidad_reloj = 0.1;

		this.clock = new THREE.Clock();
		var loader = new THREE.TextureLoader();

		// creamos el cuadrado del reloj
		var geometria_cuadrado = new THREE.BoxGeometry(10, 10, profundidad_cuadrado);
		geometria_cuadrado.translate(0, 0, -profundidad_cuadrado / 2 - profundidad_reloj);
		var textura_relieve  = loader.load('../imgs/textura_relieve.jpg');
		var material_cuadrado = new THREE.MeshPhongMaterial({ color: 0x3C270E, bumpMap: textura_relieve });
		this.cuadrado = new THREE.Mesh(geometria_cuadrado, material_cuadrado);

		// creamos el cuerpo del reloj
		var geometria_cuerpo = new THREE.BoxGeometry(10, 15, 1.3);
		this.cuerpo = new THREE.Mesh(geometria_cuerpo, material_cuadrado);
		this.cuerpo.position.set(0, -7.5 - 5, -3.5);

		// creamos el propio reloj
		var geometria_reloj = new THREE.CylinderGeometry(4, 4, profundidad_reloj, 30);
		geometria_reloj.rotateX(Math.PI / 2);
		geometria_reloj.translate(0, 0, -profundidad_reloj / 2);
		var textura_reloj = loader.load('../imgs/reloj_2.jpg');
		textura_reloj.center.set(0.5, 0.5);
		textura_reloj.rotation = Math.PI / 2;
		var material_reloj = new THREE.MeshPhongMaterial({ map: textura_reloj });
		this.reloj = new THREE.Mesh(geometria_reloj, material_reloj);

		// creamos las agujas
		var material_agujas = new THREE.MeshPhongMaterial({ color: 0x000000 });
		var geometria_aguja_grande = new THREE.CylinderGeometry(0.05, 0.05, 3, 20);
		geometria_aguja_grande.translate(0, 3 / 2, 0.1 / 2);
		var geometria_aguja_mediana = new THREE.CylinderGeometry(0.1, 0.1, 3, 20);
		geometria_aguja_mediana.translate(0, 3 / 2, 0.1 / 2);
		var geometria_aguja_pequeña = new THREE.CylinderGeometry(0.1, 0.1, 2, 20);
		geometria_aguja_pequeña.translate(0, 2 / 2, 0.1 / 2);
		this.aguja_grande = new THREE.Mesh(geometria_aguja_grande, material_agujas);
		this.aguja_mediana = new THREE.Mesh(geometria_aguja_mediana, material_agujas);
		this.aguja_pequeña = new THREE.Mesh(geometria_aguja_pequeña, material_agujas);

		// creamos el péndulo
		var geometria_palo_pendulo = new THREE.CylinderGeometry(0.5, 0.5, 7, 4);
		geometria_palo_pendulo.translate(0, -7 / 2, 0);
		var material_palo_pendulo = new THREE.MeshPhongMaterial({ color: 0x808080 });
		this.palo_pendulo = new THREE.Mesh(geometria_palo_pendulo, material_palo_pendulo);
		var geometria_circulo_pendulo = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 30);
		geometria_circulo_pendulo.rotateX(Math.PI / 2);
		geometria_circulo_pendulo.translate(0, -7 - 1.5 / 2, 0);
		this.circulo_pendulo = new THREE.Mesh(geometria_circulo_pendulo, material_palo_pendulo);

		// aplicamos rotaciones
		this.rotacion_pendulo = new THREE.Object3D();
		this.rotacion_pendulo.add(this.circulo_pendulo);
		this.rotacion_pendulo.add(this.palo_pendulo);
		this.rotacion_pendulo.position.set(0, -5, -4 / 2 - 0.1);

		// añadimos los elementos a la escena
		this.add(this.cuadrado);
		this.add(this.cuerpo);
		this.add(this.reloj);
		this.add(this.aguja_grande);
		this.add(this.aguja_mediana);
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
		this.aguja_pequeña.rotation.z -= (1 / 60 * 1 / 60 * Math.PI / 30 * segundos_transcurridos);		// pequeña : horas
		this.aguja_grande.rotation.z -= (Math.PI / 30 * segundos_transcurridos);						// grande : segundos
		this.aguja_mediana.rotation.z -= (1 / 60 * Math.PI / 30 * segundos_transcurridos);				// mediana : minutos
	}
}

export { Reloj };


