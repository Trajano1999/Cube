import * as THREE from '../libs/three.module.js'
 
class Cube extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);

    this.mesa = this.createMesa();

    this.add(this.mesa);



  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
      }
    } 
  }


  createMesa() {
    var geometria_tablero = new THREE.BoxGeometry(15, 0.2, 10);
    geometria_tablero.translate(0, 0.1, 0);
    var material = new THREE.MeshPhongMaterial({color: 0x804000});
    var geometria_pata = new THREE.CylinderGeometry(0.2, 0.2, 5, 10);
    geometria_pata.translate(0, 2.5, 0);

    var tablero = new THREE.Mesh(geometria_tablero, material);
    tablero.position.y = 5;

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

    return mesa;


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

export { Cube };
