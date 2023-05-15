import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Cajonera extends THREE.Object3D {
	constructor() {
		super();
		this.pickableObjects = [];

		// añadimos decoración lateral
		var geomDecoracion = new THREE.BoxGeometry(0.5, 10.5, 9);
		var loader = new THREE.TextureLoader();
		var textDecoracion = loader.load('../imgs/wood.jpg');
		var matDecoracion = new THREE.MeshPhongMaterial({ map: textDecoracion });
		var decoracion1 = new THREE.Mesh(geomDecoracion, matDecoracion);
		decoracion1.position.set(6, 5.25, 0.5);
		var decoracion2 = decoracion1.clone();
		decoracion2.position.set(-6, 5.25, 0.5);

		// añadimos decoración arriba y abajo
		var geomDecoracion2 = new THREE.BoxGeometry(11.5, 0.5, 9);
		var decoracion3 = new THREE.Mesh(geomDecoracion2, matDecoracion);
		decoracion3.position.set(0, 1, 0.5);
		var decoracion4 = decoracion3.clone();
		decoracion4.position.set(0, 9.5, 0.5);

		// creamos los 3 primeros cajones
		var cajonGeom = new THREE.BoxGeometry(11.5, 2, 8);
		var cajonMat1 = new THREE.MeshPhongMaterial({ color: 0xB3640B });
		var cajonMat2 = new THREE.MeshPhongMaterial({ color: 0x8C510E });
		var cajon1 = new THREE.Mesh(cajonGeom, cajonMat1);
		var cajon2 = new THREE.Mesh(cajonGeom, cajonMat2);
		var cajon3 = cajon1.clone();
		cajon1.position.y = 2.25;
		cajon2.position.y = 4.25;
		cajon3.position.y = 6.25;

		// añadimos los 3 primeros pomos
		var pomoGeom = new THREE.SphereGeometry(0.25, 15, 15);
		var pomo1 = new THREE.Mesh(pomoGeom, cajonMat2);
		pomo1.position.set(0, 2.25, 4);
		var pomo2 = new THREE.Mesh(pomoGeom, cajonMat1);
		pomo2.position.set(0, 4.25, 4);
		var pomo3 = pomo1.clone();
		pomo3.position.set(0, 6.25, 4);

		// añadimos el cuarto cajón
		var cajon4 = cajon2.clone();
		cajon4.position.y = 8.25;
		var geom_cajon_eliminado = new THREE.BoxGeometry(11, 2, 7);
		var cajon_eliminado = new THREE.Mesh(geom_cajon_eliminado, cajonMat2);
		cajon_eliminado.position.set(0, 8.5, 0);

		// añdimos el último pomo
		var pomo4 = pomo2.clone()
		pomo4.position.set(0, 8.25, 4);
		this.pickableObjects.push(pomo4);

		// aplicamos CSG
		var csg = new CSG();
		csg.union([cajon4]);
		csg.subtract([cajon_eliminado]);

		// añadimos la llave
		var llave = new Llave();
		llave.scale.set(0.2, 0.2, 0.2);
		llave.rotateY(Math.PI / 2);
		llave.position.set(0, 8, 1);
		this.pickableObjects.push(llave);

		// creamos el cajon (cajon4 - cajon_eliminado, llave, pomo4)
		this.cajon = new THREE.Object3D();
		this.cajon.add(csg.toMesh(), pomo4, llave);

		// añadimos el armario entero
		var armario = new THREE.Object3D();
		armario.add(cajon1, cajon2, cajon3, pomo1, pomo2, pomo3, decoracion1, decoracion2, decoracion3, decoracion4, this.cajon);
		this.add(armario);
	}

	update(objeto, cajon_abierto) {
		if (cajon_abierto) {
			/*if(objeto == llave)
				objeto.geometry.dispose();*/
			this.cajon.position.set(0, 0, 5);
		} else
			this.cajon.position.set(0, 0, 0);
	}

	getPickableObjects() {
		return this.pickableObjects;
	}
}

class Llave extends THREE.Object3D {
	constructor() {
		super();

		// cargamos la llave
		var file = '../models/llave/llave.mtl';
		var objeto = '../models/llave/llave.obj';

		var materialLoader = new MTLLoader();
		var objectLoader = new OBJLoader();

		this.llave = new THREE.Object3D();
		materialLoader.load(file, (materials) => {
			objectLoader.setMaterials(materials);
			objectLoader.load(objeto, (object) => {
				this.llave.add(object);
			}, null, null);
		});

		this.add(this.llave);
	}
}

export { Cajonera, Llave };