import * as THREE from '../libs/three.module.js'
 
class Puerta extends THREE.Object3D {
  constructor() {
    super();

    var geometria_puerta = new THREE.BoxGeometry(0.3, 20, 10);
    geometria_puerta.translate(0, 20/2, 0);
    var material_puerta = new THREE.MeshPhongMaterial({color: 0x808080});

    this.puerta = new THREE.Mesh(geometria_puerta, material_puerta);
    this.add(this.puerta);

    var geometria_pomo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 20);
    geometria_pomo.rotateZ(Math.PI/2);
    geometria_pomo.translate(0,0.5/2, 0 );
    var material_pomo = new THREE.MeshPhongMaterial({color: 0x000000});
    this.pomo = new THREE.Mesh(geometria_pomo, material_pomo);
    this.pomo.position.y = 10;
    this.pomo.position.z = 3;

    this.add(this.pomo);

  }

  

  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
  }
}

export { Puerta };
