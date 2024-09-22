export class Sonido {
    nombre: string;
    url: string;
    sonido: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  
    constructor(nombre: string, url: string) {
      this.nombre = nombre;
      this.url = url;
    }

    

    agregar(scene: Phaser.Scene) {
        this.sonido = scene.sound.add(this.nombre);
    }

    tocar() {
        this.sonido.play();
    }

  }
  
  