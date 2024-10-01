export class Direcciones {
    private static readonly Direcciones: { [key: string]: string } = {
      cancion: '/audio/musica_juego.mp3',
      sky: '/img/fondocuaderno.jpg',
      ground: '/img/piso_02.png',
      piso1: '/img/piso_viro_ini.png',
      piso2: '/img/piso_viro_med.png',
      piso3: '/img/piso_viro_fin.png',
      star: 'https://labs.phaser.io/assets/sprites/star.png',
      player_caminando: '/img/player_caminando1.png',
      player_volando: '/img/player_volando.png',
      lazo: '/img/lazo.png'
    };
  
    public static obtenerConstante(nombre: string): string | undefined {
      return this.Direcciones[nombre];
    }
  }