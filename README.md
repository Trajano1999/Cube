# Cube

Práctica final de la asignatura de **Sistemas Gráficos**.

Grupo formado por:
- Inma Gálvez López
- Juan Manuel Mateos Pérez.

## Descripción

Nuestro juego, denominado *Cube*, consiste en un escape room de 3 pruebas, esto es, nuestro personaje se encuentra dentro de una habitación de la que sólo puede escapar si superan 3 arduas
pruebas.

El espacio consta de una habitación cerrada con 4 paredes, un techo y un suelo.
Dentro de esta, podemos encontrar una mesa, en el centro, con diversos objetos en la
superficie (construidos con diferentes técnicas, como una taza, una cocacola, etc).

En la parte central del techo, hay dos luces: una amarilla y una azul. Habrá que
pulsar un interruptor que hay en la pared en el sitio donde aparece inicialmente el jugador,
de forma que la luz azul se convertirá en blanca. También tenemos un reloj de pared, del
que oscila un péndulo continuamente (este será nuestro objeto articulado, y el movimiento
es el del péndulo).

Por otro lado, como primera prueba, podremos encontrar tres cubos esparcidos por
el suelo, que habrá que amontonar para poder pasar a la siguiente prueba en un orden
determinado (RGB). La segunda consistirá en pulsar un botón un número concreto de veces. Este
botón se encontrará en la pared. Por último, la tercera prueba consistirá en resolver el
enigma de encontrar la llave (situada en un cajón de un mueble). Una vez la cojamos, se
podrá hacer click en el pomo de la puerta y salir del escape room.

Finalmente, siempre va a haber una mosca sobrevolando la habitación, siguiendo
una ruta definida por un spline.

¡Suerte para escapar!

## Ejecución

Para ejecutarlo en **Windows**, desde la carpeta en la que tenemos los archivos del repositorio, introducir en la terminal el siguiente comando : 

`python -m http.server`

A continuación acceder a cualquier navegador a la dirección

`localhost:8000`

y disfrutar del juego.