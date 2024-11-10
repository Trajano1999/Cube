# Cube

Práctica final de la asignatura de **Sistemas Gráficos** del Doble Grado en Ingeniería Informática y Matemáticas de la Universidad de Granada.

Grupo formado por:
- Inma Gálvez López ([@inmagalvez](https://github.com/inmagalvez))
- Juan Manuel Mateos Pérez ([@Trajano1999](https://github.com/Trajano1999))

## Descripción

Este juego consiste en un escape room virtual, en el que el protagonista se encuentra atrapado en una habitación de la que sólo puede escapar si supera 3 duras pruebas.

La estancia es un espacio cerrado delimitado por cuatro paredes, un techo y un suelo. En el centro de la habitación se encuentra una mesa sobre la cual se disponen diversos objetos construidos mediante distintas técnicas, como una taza o una botella de Coca-Cola.

En el techo se sitúan dos luces, una amarilla y otra azul. Para comenzar, es necesario accionar un interruptor ubicado en la pared donde aparece inicialmente el jugador, lo que transformará la luz azul en blanca. También hay un reloj de pared, cuyo péndulo se balancea de manera continua, constituyendo un objeto con movimiento articulado en la escena.

El primer desafío consiste en recoger tres cubos dispersos en el suelo y apilarlos en un orden específico (rojo, verde y azul) para avanzar al siguiente reto. La segunda prueba requiere pulsar un botón un número exacto de veces; dicho botón está fijado en una de las paredes. Finalmente, el tercer desafío implica resolver un enigma para encontrar una llave que se halla en un cajón de un mueble. Una vez obtenida la llave, el jugador podrá hacer clic en el pomo de la puerta y salir del escape room.

Además, una mosca estará siempre sobrevolando la habitación, siguiendo una trayectoria predefinida por un spline.

¡Buena suerte para escapar!

## Ejecución

Para ejecutarlo en **Windows**, se debe introducir en la terminal el siguiente comando:

`python -m http.server`

A continuación, acceder desde cualquier navegador a la dirección:

`localhost:8000`

¡Y disfruta del juego!
