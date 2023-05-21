import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Mesa extends THREE.Object3D {
	constructor() {
		super();

		this.altura_mesa = 5;

		var geometria_tablero = new THREE.BoxGeometry(15, 0.2, 10);
		geometria_tablero.translate(0, -0.1, 0);
		var geometria_pata = new THREE.CylinderGeometry(0.2, 0.2, this.altura_mesa, 10);
		geometria_pata.translate(0, this.altura_mesa / 2, 0);

		var loader = new THREE.TextureLoader();
		var textura_relieve = loader.load('../imgs/textura_relieve.jpg');
		var textura_madera = loader.load('../imgs/madera.jpg');
		var material_tablero = new THREE.MeshPhongMaterial({ color: 0x804000, map: textura_madera, bumpMap: textura_relieve });

		var tablero = new THREE.Mesh(geometria_tablero, material_tablero);
		tablero.position.y = this.altura_mesa;

		var material = new THREE.MeshPhongMaterial({ color: 0x804000 });

		var pata_izq_del = new THREE.Mesh(geometria_pata, material);
		var pata_izq_tras = pata_izq_del.clone();
		var pata_der_del = pata_izq_del.clone();
		var pata_der_tras = pata_izq_del.clone();

		pata_izq_del.position.set(-7.5, 0, -5);
		pata_izq_tras.position.set(-7.5, 0, 5);
		pata_der_del.position.set(7.5, 0, -5);
		pata_der_tras.position.set(7.5, 0, 5);

		var mesa = new THREE.Object3D();
		mesa.add(tablero);
		mesa.add(pata_der_del);
		mesa.add(pata_der_tras);
		mesa.add(pata_izq_del);
		mesa.add(pata_izq_tras);

		var taza = new MyTaza();
		taza.position.y = this.altura_mesa;

		var corazon_barrido = new MyCorazonBarrido();
		corazon_barrido.position.set(-5, this.altura_mesa, 0);

		var lata = new Lata();
		lata.position.set(5, this.altura_mesa, 0);

		this.add(mesa);
		this.add(taza);
		this.add(corazon_barrido);
		this.add(lata);
	}

	update() { }
}

class MyTaza extends THREE.Object3D {
	constructor() {
		super();

		var material = new THREE.MeshNormalMaterial();

		var cilExt = new THREE.CylinderGeometry(5, 5, 10, 24, 1);
		var cilInt = new THREE.CylinderGeometry(4.7, 4.7, 10, 24, 1);
		var toro = new THREE.TorusGeometry(3, 0.5, 24, 24);

		cilInt.translate(0, 0.3, 0);
		toro.translate(-5, 0, 0);

		var cilExtMesh = new THREE.Mesh(cilExt, material);
		var cilIntMesh = new THREE.Mesh(cilInt, material);
		var toroMesh = new THREE.Mesh(toro, material);

		var csg = new CSG();
		csg.union([cilExtMesh, toroMesh]);
		csg.subtract([cilIntMesh]);

		var resultadoMesh = csg.toMesh();
		resultadoMesh.scale.set(0.2, 0.2, 0.2);
		resultadoMesh.position.y = 1;
		this.add(resultadoMesh);
	}
}

class MyCorazonBarrido extends THREE.Object3D {
	constructor() {
		super();

		var shape = new THREE.Shape();
		shape.moveTo(0, 1);
		shape.bezierCurveTo(0.5, 3.5, 4, 1, 0, -2);
		shape.bezierCurveTo(-4, 1, -0.5, 3.5, 0, 1);

		var path = this.createCamino();
		var options = { curveSegments: 50, steps: 100, extrudePath: path };
		var geometry = new THREE.ExtrudeGeometry(this.rotateShape(shape, Math.PI, 100), options);
		geometry.scale(0.2, 0.2, 0.2);

		var material = new THREE.MeshNormalMaterial();
		var heart = new THREE.Mesh(geometry, material);
		this.add(heart);
	}

	createCamino() {
		var radio = 1;
		var altura_vuelta = 2;
		var num_vueltas = 2;
		var puntos_vuelta = 5;

		var angulo = (Math.PI * 2) / puntos_vuelta;
		var puntos = [];

		for (var i = 0; i < num_vueltas * puntos_vuelta; i++) {
			puntos.push(new THREE.Vector3(
				Math.cos(angulo * i) * radio,
				altura_vuelta * i,
				Math.sin(angulo * i) * radio
			));
		}

		var curva = new THREE.CatmullRomCurve3(puntos);
		return curva;
	}

	rotateShape(aShape, angle, res = 6, center = new THREE.Vector2(0, 0)) {
		var points = aShape.extractPoints(res).shape;
		points.forEach((p) => {
			p.rotateAround(center, angle);
		});
		return new THREE.Shape(points);
	}

	shapeToVector3(aShape, res = 6) {
		var v2 = aShape.extractPoints(res).shapeM
		var v3 = [];

		v2.forEach((v) => {
			v3.push(new THREE.Vector3(v.x, v.y, 0));
		});

		return v3;
	}
}

class Lata extends THREE.Object3D {
	constructor() {
		super();

		// creamos cilindro con textura
		var geom_Cylinder = new THREE.CylinderGeometry(3.05, 3.05, 7, 32);
		geom_Cylinder.translate(0, 3.5, 0);
		var loader = new THREE.TextureLoader();
		var textura_lata = loader.load('../imgs/lata-coke.jpg');
		var material_Cylinder = new THREE.MeshPhongMaterial({ map: textura_lata });
		var cylinder = new THREE.Mesh(geom_Cylinder, material_Cylinder);
		cylinder.scale.set(0.2, 0.2, 0.2);
		cylinder.translateY(0.2);
		this.add(cylinder);

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
		this.latheObject.scale.set(0.2, 0.2, 0.2);
		this.add(this.latheObject);
	}
}

export { Mesa };


