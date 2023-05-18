import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Llave extends THREE.Object3D {
    constructor() {
        super();
        this.pickableObjects = [];

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

        this.llave.scale.set(0.2, 0.2, 0.2);
        this.llave.rotateY(Math.PI / 2);
        this.pickableObjects.push(this.llave);
        this.add(this.llave);
    }

    update() {
        this.visible = false;
    }

    getPickableObjects() {
        return this.pickableObjects;
    }
}

export { Llave };