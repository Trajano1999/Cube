import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Mosca extends THREE.Object3D {
    constructor() {
        super();

        // cargamos la mosca
        var file = '../models/mosca/mosca.mtl';
        var objeto = '../models/mosca/mosca.obj';

        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        this.mosca = new THREE.Object3D();
        materialLoader.load(file, (materials) => {
            objectLoader.setMaterials(materials);
            objectLoader.load(objeto, (object) => {
                this.mosca.add(object);
            }, null, null);
        });

        this.add(this.mosca);
        this.mosca.scale.set(0.4, 0.4, 0.4);

        // aplicamos recorrido y animación
        this.recorrido();
        this.animate();
    }

    recorrido() {
        // construimos los dos caminos con puntos clave
        this.spline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(20, 37, -20),
            new THREE.Vector3(-30, 40, -20),
            new THREE.Vector3(-15, 39, 10),
            new THREE.Vector3(-10, 41, 0),
            new THREE.Vector3(-15, 39, -10),
            new THREE.Vector3(-30, 40, 20),
            new THREE.Vector3(30, 37, 30),
            new THREE.Vector3(35, 35, 20),
            new THREE.Vector3(10, 37, 0),
            new THREE.Vector3(35, 35, -18),
            new THREE.Vector3(20, 37, -20),
        ]);

        // definimos los recorridos
        var geometryLine = new THREE.BufferGeometry();
        geometryLine.setFromPoints(this.spline.getPoints(100));
        var materialLine = new THREE.LineBasicMaterial({ color: 0x000000 });

        // visualizamos el recorrido
        var visibleSpline = new THREE.Line(geometryLine, materialLine);
        this.add(visibleSpline);
    }

    animate() {
        // definimos el primer movimiento
        var origen = { t: 0 };
        var destino = { t: 1 };
        var tiempoRecorrido = 20 * 1000;

        var movimiento = new TWEEN.Tween(origen)
            .to(destino, tiempoRecorrido)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => {
                var posicion = this.spline.getPointAt(origen.t);
                this.mosca.position.copy(posicion);
                var tangente = this.spline.getTangentAt(origen.t);
                posicion.add(tangente);
                this.mosca.lookAt(posicion);
                this.mosca.rotateX(-Math.PI / 2);
            })
            .onComplete(() => {
                origen.t = 0;
            })
            .repeat(Infinity)

        // iniciamos el movimiento
        movimiento.start();
    }

    update() {
        TWEEN.update();
    }
}

export { Mosca };