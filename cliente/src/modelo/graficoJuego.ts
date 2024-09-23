// src/GameScene.ts
import Phaser from 'phaser';
import { Imagen } from './imagen';
import { Animacion } from './animacion';
import { EntidadGrafica } from './entidadgrafica';
import { AgendaAccionesGrafica }  from './AgendaAccionesGrafica';
import { AnimacionEntidadGrafica } from './animacionentidadgrafica';
import { Sonido } from './sonido';

export class graficoJuego {
    
    private game: Phaser.Game;
    private scene: Phaser.Scene;
    public agenda: AgendaAccionesGrafica;

    sonidos: Sonido[] = [];
    imagenes: Imagen[] = [];
    animaciones: Animacion[] = [];
    animacionesendadgrafica :AnimacionEntidadGrafica[] = [];
    
    private entidades: EntidadGrafica[] = [];
    
    GetEntidad(id: string): EntidadGrafica {
        return this.entidades.find(entidad => entidad.id === id);
    }

   
    AdddEntidad(entidad: EntidadGrafica): EntidadGrafica {
        entidad.agregar(this.scene);
        this.entidades.push(entidad)
        return entidad;
    }
 


    
    GetSonido(nombre: string): Sonido {
        return this.sonidos.find(sonido => sonido.nombre === nombre);
    }
    
    constructor() {
        //super('Juego');
        this.agenda = new AgendaAccionesGrafica(60);
    }

    init() {
        const config: Phaser.Types.Core.GameConfig = {
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
    this.imagenes.forEach(imagen => {
        this.scene.load.image(imagen.nombre, imagen.url);
    });

    // Cargar animaciones (spritesheets)
    this.animaciones.forEach(animacion => {
        this.scene.load.spritesheet(animacion.nombre, animacion.url, { frameWidth: animacion.largoCuadro, frameHeight: animacion.anchoCuadro });
    });   



    this.sonidos.forEach(sonido => {
        this.scene.load.audio( sonido.nombre , sonido.url);
    });



  }


  create() {

        
        this.animacionesendadgrafica.forEach(animacion => {
            this.scene.anims.create({
                key: animacion.key,
                frames: this.scene.anims.generateFrameNumbers(animacion.nombreImagen, { start: animacion.startFrame, end: animacion.endFrame }),
                frameRate: animacion.frameRate,
                repeat: animacion.repeat
            });
        });

        

        
        // Añadir fondo
        this.scene.add.image(400, 300, 'sky').setScrollFactor(0);
        this.scene.cameras.main.setBounds(0, 0, 3000, 600);


        
        this.sonidos.forEach(sonido => {
            sonido.agregar(this.scene)
        });
    }


  update() {
    this.agenda?.actualizar()
  }

  setPosicionCamara(posicion: number) {
    this.scene.cameras.main.scrollX  = posicion;
  }
}


