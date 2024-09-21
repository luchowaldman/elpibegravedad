// src/GameScene.ts
import Phaser from 'phaser';

export class Juego extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private otherPlayers: { [key: string]: any } = {};

    constructor() {
        super('Juego');
    }

    init() {
        let config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 1800,
            height: 600,
            parent: 'juego-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 129 , x: 0},
                    debug: false
                }
            },
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };
        const game = new Phaser.Game(config);

    }

    preload() {
       // this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
        this.load.image('ground', '/img/piso_02.png');
        this.load.image('star', 'https://labs.phaser.io/assets/sprites/star.png');
        this.load.spritesheet('dude', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        // Añadir fondo
        this.add.image(400, 300, 'sky').setScrollFactor(0);

        // Crear grupo de plataformas
        this.platforms = this.physics.add.staticGroup();

        // Crear plataformas
        this.platforms.create(200, 400, 'ground').setScale(1.4).refreshBody();
        this.platforms.create(400, 390, 'ground');
        this.platforms.create(600, 400, 'ground');

        // Crear jugador
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Añadir animaciones para el jugador
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Habilitar colisiones entre el jugador y las plataformas
        this.physics.add.collider(this.player, this.platforms);

        // Configurar controles
        this.cursors = this.input.keyboard.createCursorKeys();

        // Expander el tamaño del mundo
        this.physics.world.setBounds(0, 0, 3000, 600);

        // Hacer que la cámara siga al jugador
        this.cameras.main.setBounds(0, 0, 3000, 600);
        // this.cameras.main.startFollow(this.player);
    }

    update() {
        // Comprobar si otros jugadores están añadidos
       // if (Object.keys(this.otherPlayers).length === 0) {
            // Ejemplo para añadir jugadores si no están presentes
       // }

        // Controles de movimiento
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // Saltar si está en el suelo
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}


