// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { Stats } from '../libs/stats.module.js'
import { PointerLockControls } from './CamaraPP.js'

// Clases de mi proyecto

import { Mesa } from './Mesa.js'
import { Paredes } from './Paredes.js'
import { Cubos } from './Cubos.js'
import { Puerta } from './Puerta.js'
import { Cajonera } from './Cajonera.js'
import { Llave } from './Llave.js'
import { Mosca } from './Mosca.js'
import { Boton } from './Boton.js'
import { Reloj } from './Reloj.js'
import { BotonLuces } from './BotonLuces.js'
import { Lampara } from './Lampara.js'

// ─── Clase Escena ───────────────────────────────────────────────────────────

class MyScene extends THREE.Scene {
	constructor(myCanvas) {
		super();
		this.cubos_seleccionados = false;
		this.contador_boton = 0;
		this.cajonCerrado = true;
		this.llaveCogida = false;
		this.puerta_abierta = false;
		this.seg_prueba_hecha = false;
		this.luz_blanca_encendida = false;

		//this.mouse = new THREE.Vector2();
		this.raycaster = new THREE.Raycaster();

		// Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
		this.renderer = this.createRenderer(myCanvas);

		// Se añade a la gui los controles para manipular los elementos de esta clase
		this.gui = this.createGUI();

		this.initStats();

		// Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
		// Tras crear cada elemento se añadirá a la escena con this.add(variable)
		this.createLights();

		// Tendremos una cámara con un control de movimiento con el ratón
		this.createCamera();

		// Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
		this.axis = new THREE.AxesHelper(5);
		this.add(this.axis);

		// añadimos los elementos de Cube
		this.mesa = new Mesa();
		this.add(this.mesa);

		this.estructura = new Paredes();
		this.add(this.estructura);

		this.cubos = new Cubos();
		this.cubos.position.set(-25, 0, 25);
		this.add(this.cubos);

		this.puerta = new Puerta();
		this.puerta.position.set(75 / 2 + 0.1, 0, 0);
		this.add(this.puerta);

		this.cajonera = new Cajonera();
		this.cajonera.position.set(25, 0, -33.5);

		this.llave = new Llave();
		this.llave.position.set(0, 8, 1);
		this.cajonera.cajon.add(this.llave);
		this.add(this.cajonera);

		this.mosca = new Mosca();
		this.add(this.mosca);

		this.boton = new Boton();
		this.boton.position.set(-75 / 2, 20, 0);
		this.add(this.boton);

		this.reloj = new Reloj();
		this.reloj.position.set(0, 20, -75 / 2 + 0.1 + 4);
		this.add(this.reloj);

		this.botonLuces = new BotonLuces();
		this.botonLuces.position.set(37.5, 12, 23);
		this.add(this.botonLuces);

		this.lamparaAmarilla = new Lampara();
		this.lamparaAmarilla.position.set(-15, 41.2, 0);
		this.add(this.lamparaAmarilla);

		this.lamparaAzul = new Lampara();
		this.lamparaAzul.position.set(15, 41.2, 0);
		this.add(this.lamparaAzul);
	}

	// ─── Stats ──────────────────────────────────────────────────────────────

	initStats() {
		var stats = new Stats();
		stats.setMode(0); // 0: fps, 1: ms

		// Align top-left
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';

		$("#Stats-output").append(stats.domElement);

		this.stats = stats;
	}

	// ─── Cámara ─────────────────────────────────────────────────────────────

	createCamera() {
		// Para crear una cámara le indicamos
		//   El ángulo del campo de visión en grados sexagesimales
		//   La razón de aspecto ancho/alto
		//   Los planos de recorte cercano y lejano
		this.camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
		// posición de la cámara
		this.camera.position.set(32, 12, 34);
		// apuntamos la cámara al centro
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		// añadimos la cámara
		this.add(this.camera);

		// Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
		this.cameraControl = new PointerLockControls(this.camera, this.renderer.domElement);
		this.cameraControl.lock();
	}

	// ─── Gestor Espacio ──────────────────────────────────────────────────────

	testColision(donde_estoy, a_donde_miro) {
		var bool = false;

		/*if (donde_estoy.x >= -37) {
			if (a_donde_miro.x < 0 && a_donde_miro.x > -1 && a_donde_miro.x < 1) {
				bool = false;
			}
		}*/

		return bool;
	}

	// ─── Gestor Teclas ──────────────────────────────────────────────────────

	onKeyDown(event) {
		var tecla = event.wich || event.keyCode;
		switch (tecla) {
			case 38: case 87: // Flecha arriba
				this.adelante = true;
				break;
			case 40: case 83: // Flecha abajo
				this.atras = true;
				break;
			case 37: case 65: // Flecha izquierda
				this.izq = true;
				break;
			case 39: case 68: // Flecha derecha
				this.der = true;
				break;
			case 77: // letra M
				this.cameraControl.unlock();
				break;
		}
	}

	onKeyUp(event) {
		var tecla = event.wich || event.keyCode;
		switch (tecla) {
			case 38: case 87: // Flecha arriba
				this.adelante = false;
				break;
			case 40: case 83: // Flecha abajo
				this.atras = false;
				break;
			case 37: case 65: // Flecha izquierda
				this.izq = false;
				break;
			case 39: case 68: // Flecha derecha
				this.der = false;
				break;
			case 77: // Letra M
				this.cameraControl.lock();
				break;
		}
	}

	// ─── Gestor del Ratón  ──────────────────────────────────────────────────

	onMouseMove(event) {
		if (this.cubos_seleccionados) {
			// Calcula la posición del ratón en la ventana
			const mouseX = event.clientX;
			const mouseY = event.clientY;

			// Calcula el desplazamiento del ratón desde la última posición
			var deltaX = mouseX - this.mouseX;
			var deltaY = mouseY - this.mouseY;

			deltaX = deltaX / 30;
			deltaY = deltaY / 30;

			// Actualiza la posición del cubo seleccionado en función del desplazamiento del ratón
			this.cubo_seleccionado.position.x += deltaX;
			this.cubo_seleccionado.position.z += deltaY;

			if (this.cubos.hayChoque1 == true) {
				this.cubo_seleccionado.position.y += 3;
				this.cubos.hayChoque1 = false;
				this.cubos.hesubido1 = true;
			}
			if (this.cubos.hayChoque2 == true) {
				this.cubo_seleccionado.position.y += 3;
				this.cubos.hayChoque2 = false;
				this.cubos.hesubido2 = true;
			}
			if (this.cubos.hayChoque3 == true) {
				this.cubo_seleccionado.position.y += 3;
				this.cubos.hayChoque3 = false;
				this.cubos.hesubido3 = true;
			}

			if (this.cubos.bajar1 == true) {
				this.cubos.bajar1 = false;
				this.cubo_seleccionado.position.y -= 3;
				this.cubos.hesubido1 = false;
			}

			if (this.cubos.bajar2 == true) {
				this.cubos.bajar2 = false;
				this.cubo_seleccionado.position.y -= 3;
				this.cubos.hesubido2 = false;
			}

			if (this.cubos.bajar3 == true) {
				this.cubos.bajar3 = false;
				this.cubo_seleccionado.position.y -= 3;
				this.cubos.hesubido3 = false;
			}

			// Actualiza la posición del ratón
			this.mouseX = mouseX;
			this.mouseY = mouseY;
		}
	}

	onMouseDown(event) {
		//var mouse = new THREE.Vector2();
		var mouse = new THREE.Vector2();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

		//var raycaster = new THREE.Raycaster();
		this.raycaster.setFromCamera(mouse, this.camera);

		this.pickedBoton = this.raycaster.intersectObjects(this.boton.getPickableObjects(), true);
		this.pickedObjects_cubos = this.raycaster.intersectObjects(this.cubos.getPickableObjects(), true);
		this.pickedCajon = this.raycaster.intersectObjects(this.cajonera.getPickableObjects(), true);
		this.pickedLlave = this.raycaster.intersectObjects(this.llave.getPickableObjects(), true);
		this.pickedPuerta = this.raycaster.intersectObjects(this.puerta.getPickableObjects(), true);
		this.pickedBotonLuces = this.raycaster.intersectObjects(this.botonLuces.getPickableObjects(), true);

		// cubos
		if (this.pickedObjects_cubos.length > 0) {
			this.cubos_seleccionados = true;
			console.log("Has clickado en el cubo con identificador: " + this.pickedObjects_cubos[0].object.userData.getIdCubo());
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;
			this.cubo_seleccionado = this.pickedObjects_cubos[0].object.userData;
		}

		// botón pared
		if (this.pickedBoton.length > 0) {
			this.contador_boton += 1;
			if (this.contador_boton == 3) {
				this.seg_prueba_hecha = true;
				this.boton.update();
			}
		}

		// cajón
		if (this.pickedCajon.length > 0) {
			this.cajonera.update(this.cajonCerrado);
			this.cajonCerrado = !this.cajonCerrado;
		}

		// llave
		if (this.pickedLlave.length > 0) {
			if (!this.cajonCerrado && !this.llaveCogida && this.seg_prueba_hecha) {
				this.llave.update();
				this.llaveCogida = true;
			}
		}

		// pomo puerta
		if (this.pickedPuerta.length > 0) {
			if (this.llaveCogida && !this.puerta_abierta) {
				this.puerta.animacion();
				this.puerta_abierta = true;
			}
		}

		// botón luces
		if (this.pickedBotonLuces.length > 0) {
			this.luz_blanca_encendida = !this.luz_blanca_encendida;
		}
	}

	onMouseUp() {
		if (this.cubos_seleccionados) {
			this.cubos_seleccionados = false;
		}
	}

	// ─── GUI ────────────────────────────────────────────────────────────────

	createGUI() {
		// Se crea la interfaz gráfica de usuario
		var gui = new GUI();

		// La escena le va a añadir sus propios controles. 
		// Se definen mediante un objeto de control
		// En este caso la intensidad de la luz y si se muestran o no los ejes
		this.guiControls = {
			// En el contexto de una función   this   alude a la función
			lightIntensity: 0.5,
			axisOnOff: true
		}

		// Se crea una sección para los controles de esta clase
		var folder = gui.addFolder('Luz y Ejes');

		// Se le añade un control para la intensidad de la luz
		folder.add(this.guiControls, 'lightIntensity', 0, 1, 0.1)
			.name('Intensidad de la Luz : ')
			.onChange((value) => this.setLightIntensity(value));

		// Y otro para mostrar u ocultar los ejes
		folder.add(this.guiControls, 'axisOnOff')
			.name('Mostrar ejes : ')
			.onChange((value) => this.setAxisVisible(value));

		return gui;
	}

	// ─── Luces ──────────────────────────────────────────────────────────────

	createLights() {
		// Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
		// La luz ambiental solo tiene un color y una intensidad
		// Se declara como var y va a ser una variable local a este método
		// se hace así puesto que no va a ser accedida desde otros métodos
		var ambientLight = new THREE.AmbientLight(0xccddee, 0.5);
		this.add(ambientLight);

		// luz amarilla
		this.spotLightAmarrila = new THREE.SpotLight(0xFFFF00, 0.4);
		this.spotLightAmarrila.position.set(-15, 44.2, 0);
		var target_amarilla = new THREE.Object3D();
		target_amarilla.position.set(-15, 0, 0);
		this.spotLightAmarrila.target = target_amarilla;
		this.add(target_amarilla);
		this.add(this.spotLightAmarrila);

		// luz azul
		this.spotLightAzul = new THREE.SpotLight(0x53C7FA, this.guiControls.lightIntensity);
		this.spotLightAzul.position.set(15, 44.2, 0);
		var target_azul = new THREE.Object3D();
		target_azul.position.set(15, 0, 0);
		this.spotLightAzul.target = target_azul;
		this.add(target_azul);
		this.add(this.spotLightAzul);

		// luz Blanca
		this.spotLightBlanca = new THREE.SpotLight(0x56FFF5, this.guiControls.lightIntensity);
		this.spotLightBlanca.position.set(15, 44.2, 0);
		this.spotLightBlanca.target = target_azul;
	}

	// ─── Gestor de Luces ────────────────────────────────────────────────────

	gestorLuces(){
		if(this.luz_blanca_encendida){
			this.remove(this.spotLightAzul);
			this.add(this.spotLightBlanca);
		}else{
			this.remove(this.spotLightBlanca);
			this.add(this.spotLightAzul);
		}
	}

	// ─── Getters ────────────────────────────────────────────────────────────

	getCamera() {
		// En principio se devuelve la única cámara que tenemos
		// Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
		return this.camera;
	}

	// ─── Setters ────────────────────────────────────────────────────────────

	setLightIntensity(valor) {
		this.spotLightBlanca.intensity = valor;
		this.spotLightAzul.intensity = valor;
	}

	setAxisVisible(valor) {
		this.axis.visible = valor;
	}

	setCameraAspect(ratio) {
		// Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
		// su sistema operativo hay que actualizar el ratio de aspecto de la cámara
		this.camera.aspect = ratio;
		// Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
		this.camera.updateProjectionMatrix();
	}

	// ─── Render ─────────────────────────────────────────────────────────────

	createRenderer(myCanvas) {
		// Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

		// Se instancia un Renderer   WebGL
		var renderer = new THREE.WebGLRenderer();

		// Se establece un color de fondo en las imágenes que genera el render
		renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

		// Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
		renderer.setSize(window.innerWidth, window.innerHeight);

		// La visualización se muestra en el lienzo recibido
		$(myCanvas).append(renderer.domElement);

		return renderer;
	}

	// ─── Resize ─────────────────────────────────────────────────────────────

	onWindowResize() {
		// Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
		// Hay que actualizar el ratio de aspecto de la cámara
		this.setCameraAspect(window.innerWidth / window.innerHeight);

		// Y también el tamaño del renderizador
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	// ─── Update ─────────────────────────────────────────────────────────────

	update() {
		// Se actualizan las estadísticas
		if (this.stats) this.stats.update();

		// Control de las paredes
		if (this.adelante || this.atras || this.izq || this.der) {
			//donde_estoy.copy(this.camera.position);
			var a_donde_miro = new THREE.Vector3(0, 0, 0);
			this.cameraControl.getDirection(a_donde_miro);
			a_donde_miro.y = 0;
			a_donde_miro.normalize();

			if (!this.testColision(this.camera.position, a_donde_miro)) {
				if (this.adelante)
					this.cameraControl.moveForward(1);
				if (this.atras)
					this.cameraControl.moveForward(-1);
				if (this.izq)
					this.cameraControl.moveRight(-1);
				if (this.der)
					this.cameraControl.moveRight(1);
			}
			// console.log("donde miro : (", a_donde_miro.x, ",", a_donde_miro.z, ")", "\ndonde estoy : (", this.camera.position.x, ",", this.camera.position.z, ")");
		}

		// Se actualiza el resto del modelo
		this.mosca.update();
		this.reloj.update();
		if (this.cubos_seleccionados)
			this.cubos.update();

		// Se actualizan las luces
		this.gestorLuces();

		// Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
		this.renderer.render(this, this.getCamera());

		// Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
		// Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
		// Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
		requestAnimationFrame(() => this.update())
	}
}

// ─── Main ───────────────────────────────────────────────────────────────────

$(function () {
	// Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
	var scene = new MyScene("#WebGL-output");

	// Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
	window.addEventListener("resize", () => scene.onWindowResize());
	window.addEventListener("keydown", (event) => scene.onKeyDown(event), true);
	window.addEventListener("keyup", (event) => scene.onKeyUp(event), true);

	//Añadimos ahora lo listeners que nos van a permitir superar las pruebas del scaperoom.
	window.addEventListener("mousemove", (event) => scene.onMouseMove(event), true);
	window.addEventListener("mousedown", (event) => scene.onMouseDown(event), true);
	window.addEventListener("mouseup", () => scene.onMouseUp(), true);

	// Que no se nos olvide, la primera visualización.
	scene.update();
});
