import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Mosca extends THREE.Object3D {
    constructor() {
        super();

        // creamos la figura
        /*var geometria = new THREE.ConeGeometry(0.4, 1.5, 3);
        geometria.rotateX(Math.PI / 2);
        var material = new THREE.MeshNormalMaterial();
        this.model = new THREE.Mesh(geometria, material);
        this.add(this.model);*/

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
        this.add(this.mosca)

        this.mosca.scale.set(0.1, 0.1, 0.1);

        // aplicamos recorrido y animación
        this.recorrido();
        this.animate();
    }

    recorrido() {
        // construimos los dos caminos con puntos clave
        this.spline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 28, 0),
            new THREE.Vector3(-7, 27, 4),
            new THREE.Vector3(-8, 28, -2),
            new THREE.Vector3(0, 27, 0),
            new THREE.Vector3(6, 26, 2),
            new THREE.Vector3(10, 29, -2),
            new THREE.Vector3(0, 28, 0),
        ]);

        // definimos los recorridos
        var geometryLine = new THREE.BufferGeometry();
        geometryLine.setFromPoints(this.spline.getPoints(100));
        var materialLine = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // visualizamos el recorrido
        var visibleSpline = new THREE.Line(geometryLine, materialLine);
        this.add(visibleSpline);
    }

    animate() {
        // definimos el primer movimiento
        var origen = { t: 0 };
        var destino = { t: 1 };
        var tiempoRecorrido = 10 * 1000;

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