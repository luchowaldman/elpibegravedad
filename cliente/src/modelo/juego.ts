// src/GameScene.ts
import Phaser from 'phaser';
import { Imagen } from './imagen';
import { Animacion } from './animacion';
import { EntidadGrafica } from './entidadgrafica';

export class Juego {
    private player!: Phaser.Physics.Arcade.Sprite;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private otherPlayers: { [key: string]: any } = {};
    private game: Phaser.Game;

    private scene: Phaser.Scene;

    imagenes: Imagen[] = [];
    animaciones: Animacion[] = [];
    entidades: EntidadGrafica[] = [];
    
 
    
    constructor() {
        //super('Juego');
    }

    init() {
        let config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'juego-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 , x: 0},
                    debug: false
                }
            },
            scene: {
                preload: this.preload.bind(this),
                create: this.create.bind(this),
                update: this.update.bind(this)
            }
        };
        this.cargarImagenes();
        this.game = new Phaser.Game(config);
        this.scene = this.game.scene.scenes[0];

    }

    
    
    
     // Función para cargar las imágenes y animaciones en los vectores correspondientes
  cargarImagenes() {
    // Añadir imágenes al vector 'imagenes'
    this.imagenes.push(new Imagen('sky', 'https://labs.phaser.io/assets/skies/space3.png'));
    this.imagenes.push(new Imagen('ground', '/img/piso_02.png'));
    this.imagenes.push(new Imagen('star', 'https://labs.phaser.io/assets/sprites/star.png'));

    // Añadir animaciones al vector 'animaciones'
    this.animaciones.push(new Animacion('dude', 'https://labs.phaser.io/assets/sprites/dude.png', 32, 48));



    var ent = new EntidadGrafica("pared1", "ground", 200, 200)
    ent.escala = 1.4;
    this.entidades.push(ent);
    this.entidades.push(new EntidadGrafica("parte2", "ground", 430, 200));
    this.entidades.push(new EntidadGrafica("parte3", "ground", 630, 200));

    
    var ent2 = new EntidadGrafica("pared1", "dude", 200, 140)
    ent2.numero_frame = 5;
    ent2.velocidadX = 40;
    this.entidades.push(ent2);


  }

  // Función de preload que recorre los vectores y carga las imágenes/animaciones
  preload() {
    // Cargar imágenes
    
    this.scene = this.game.scene.scenes[0];
    if (this.imagenes)
    this.imagenes.forEach(imagen => {
        this.scene.load.image(imagen.nombre, imagen.url);
    });

    // Cargar animaciones (spritesheets)
    if (this.animaciones )
    this.animaciones.forEach(animacion => {
        this.scene.load.spritesheet(animacion.nombre, animacion.url, { frameWidth: animacion.largoCuadro, frameHeight: animacion.anchoCuadro });
    });
  }


    create() {
        // Añadir fondo
        this.scene.add.image(400, 300, 'sky').setScrollFactor(0);

        this.entidades.forEach(entidad => {
            entidad.agregar(this.scene)
        });
        
    }

    update() {
        
    }
}


