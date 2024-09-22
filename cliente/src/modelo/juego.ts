﻿// src/GameScene.ts
import Phaser from 'phaser';
import { Imagen } from './imagen';
import { Animacion } from './animacion';
import { EntidadGrafica } from './entidadgrafica';

export class Juego {
    
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
        this.game = new Phaser.Game(config);
        this.scene = this.game.scene.scenes[0];

    }

    
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
        //this.scene.physics.world.setBounds(0, 0, 3000, 600);
        this.scene.cameras.main.setBounds(0, 0, 3000, 600);

        this.entidades.forEach(entidad => {
            entidad.agregar(this.scene)
        });
        
  }

  update() {
        
  }

  setPosicionCamara(posicion: number) {
    this.scene.cameras.main.scrollX  = posicion;
  }
}


