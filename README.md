# El pibe gravedad

## Juego

Versión en línea de Gravity Guy, donde los jugadores usan un único botón para cambiar la gravedad. En este juego multijugador, todos compiten en la misma pista visible en la pantalla. El objetivo es evitar obstáculos y no caer fuera del escenario, ya que los jugadores que
se quedan atrapados o caen son eliminados. El ganador sera el ultimo jugador que permanezca en la pista o el primero en llegar al final de la misma.

Una pista puede contar con diferentes desafíos, como áreas sin suelo, escalones, plataformas móviles y otros obstáculos que dificulten la carrera. Los jugadores también podrán chocar entre sí, añadiendo una capa extra de dificultad y estrategia.

![Gravity guys original](https://media.pocketgamer.com/artwork/na-yqqv/iphone_gravity-guy_1.jpg "Gravity guy")

Trailer del juego original: [Gravity Guy Trailer](https://www.youtube.com/watch?v=iVTqXnJAotQ&ab_channel=Miniclip).

Aunque el juego original ofrece un modo multijugador ("Multiplayer Mode" en el video), el mismo solo funcionaba de forma local, asignando a los distintos jugadores distintas teclas para realizar los movimientos. Por lo tanto, nuestro objetivo principal sera crear este modo de forma online en tiempo real ademas de darle al juego un estilo visual propio.

## Documentacion tecnica

El proyecto esta dividido en dos componentes principales:

1. El cliente web encargado de mostrar los jugadores la interfaz grafica para jugar.
2. El servidor encargado de la logica del juego y la comunicacion entre los distintos clientes.

Para asegurar que todos los jugadores estén sincronizados en tiempo real, el servidor tendrá dos
tareas clave. Primero, se encargará de la lógica de envío y recepción de mensajes entre los clientes,
así como del "motor" del juego que realiza los cálculos de la posición de cada jugador en cada tick.
Planeamos que haya 30 ticks por segundo para mantener el juego fluido.

El cliente, por su parte, recibirá del servidor la posición de la cámara y será responsable de renderizar
el mundo visible en esa área. La cámara se moverá a una velocidad constante, pero el servidor
enviará continuamente la posición de la cámara para evitar descoordinación entre los distintos
clientes y garantizar que todos vean el mismo escenario en tiempo real.

Además del juego en sí, necesitaremos desarrollar toda la lógica para gestionar la experiencia
multijugador. Esto incluye la creación de salas donde los jugadores puedan reunirse, el sistema de
invitaciones para que los amigos puedan unirse a partidas, y la gestión de la entrada y salida de los
jugadores en las partidas. También será importante implementar un sistema para iniciar y finalizar las
partidas, asegurando que todo funcione de manera fluida y sin interrupciones.

## Cliente

Servidor escrito en Golang para el juego "El pibe gravedad".

### Ejecucion local

La ejecucion local del proyecto es necesario tener instalado `npn` `node.js` y `lint`:

1. Instalar:

    ```bash
    cd cliente
    npm install
    ```

2. Ejecutar
    npm run dev


Para detalles sobre el cliente visita [esta pagina](cliente/README.md).


## Server

Servidor escrito en Golang para el juego "El pibe gravedad".

### Ejecucion local

La ejecucion local del proyecto es utilizando `docker` y `make`:

1. Instala docker y el plugin compose
2. Instala make
3. Ejecuta

    ```bash
    make dev
    ```

O directamente usando `go`:

1. Instala go>1.23.1
2. Ejecuta

    ```bash
    go run .
    ```

Para detalles sobre el servidor visita [esta pagina](server/README.md).
