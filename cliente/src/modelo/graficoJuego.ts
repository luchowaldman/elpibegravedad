// src/GameScene.ts
import Phaser from 'phaser';
import { Imagen } from './imagen';
import { Animacion } from './animacion';
import { EntidadGrafica } from './entidadgrafica';
import { AgendaAccionesGrafica } from './AgendaAccionesGrafica';
import { AnimacionEntidadGrafica } from './animacionentidadgrafica';
import { Sonido } from './sonido';
import { Direcciones } from './Direcciones';
import { Texto } from './Texto';
import { Controles } from './controles';

export class graficoJuego {
    largo: number;


    private game: Phaser.Game;
    private scene: Phaser.Scene;
    public agenda: AgendaAccionesGrafica;
    public controles: Controles = new Controles();

    sonidos: Sonido[] = [];
    textos: Texto[] = [];
    imagenes: Imagen[] = [];
    animaciones: Animacion[] = [];
    animacionesendadgrafica: AnimacionEntidadGrafica[] = [];

    private entidades: EntidadGrafica[] = [];
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    spaceBar: Phaser.Input.Keyboard.Key;
    keyG: Phaser.Input.Keyboard.Key;
    fondo: string = "sky";

    GetEntidad(id: string): EntidadGrafica {
        return this.entidades.find(entidad => entidad.id === id);
    }


    AdddEntidad(entidad: EntidadGrafica): EntidadGrafica {
        entidad.agregar(this.scene);
        this.entidades.push(entidad)
        return entidad;
    }
    AddImagen(nombre: string): void {
        if (!this.imagenes.some(imagen => imagen.nombre === nombre)) {
            const url = Direcciones.obtenerConstante(nombre);
            if (url) {
                this.imagenes.push(new Imagen(nombre, url));
            }
        }
    }

    AddSonido(nombre: string): void {
        if (!this.sonidos.some(sonido => sonido.nombre === nombre)) {
            const url = Direcciones.obtenerConstante(nombre);
            if (url) {
                this.sonidos.push(new Sonido(nombre, url));
            }
        }
    }

    AddAnimacion(nombre: string, largoCuadro: number, anchoCuadro: number): void {
        if (!this.animaciones.some(animacion => animacion.nombre === nombre)) {
            const url = Direcciones.obtenerConstante(nombre);
            if (url) {
                this.animaciones.push(new Animacion(nombre, url, largoCuadro, anchoCuadro));
            }
        }
    }

    AddAnimacionEntidadGrafica(key: string, nombreImagen: string, startFrame: number, endFrame: number, frameRate: number, repeat: number): void {
        if (!this.animacionesendadgrafica.some(animacion => animacion.key === key)) {
            this.animacionesendadgrafica.push(new AnimacionEntidadGrafica(key, nombreImagen, startFrame, endFrame, frameRate, repeat));
        }
    }



    setLargo(largo: number) {
        this.largo = largo;
    }

    GetSonido(nombre: string): Sonido {
        return this.sonidos.find(sonido => sonido.nombre === nombre);
    }

    GetTexto(id: string): Texto {
        return this.textos.find(texto => texto.id === id);
    }


    mostrarTexto(texto: Texto) {
        texto.agregar(this.scene);
        this.textos.push(texto);
    }


    eliminarTexto(id: string) {
        const texto = this.textos.find(texto => texto.id === id);
        if (texto) {
            this.textos = this.textos.filter(texto => texto.id !== id);
            texto.text?.destroy();
            this.textos = this.textos.filter(texto => texto.id !== id);
            //    texto.eliminar();
        }
    }



    constructor() {
        //super('Juego');
        this.agenda = new AgendaAccionesGrafica(60);
    }
    async init() {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 1500,
            height: 600,
            parent: 'juego-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0, x: 0 },
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

        // Wait for the game to be fully initialized
        await new Promise<void>((resolve) => {
            this.game.events.once('ready', resolve);
        });

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
            this.scene.load.audio(sonido.nombre, sonido.url);
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
        this.scene.add.image(700, 600, this.fondo).setScale(1.5).setScrollFactor(0);
        this.scene.cameras.main.setBounds(0, 0, this.largo, 600);

        this.sonidos.forEach(sonido => {
            sonido.agregar(this.scene)
        });
        this.controles.agregar(this.scene);
    }




    update() {

        this.controles.actualizar();
        this.agenda?.actualizar()
    }

    
    getPosicionCamara(): number {
        return this.scene.cameras.main.scrollX;
    }

    setPosicionCamara(posicion: number) {
        this.scene.cameras.main.scrollX = posicion;
    }
}


