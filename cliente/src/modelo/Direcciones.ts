export class Direcciones {
    private static readonly Direcciones: { [key: string]: string } = {
      cancion: '/audio/musica_juego.mp3',
      sky: '/img/fondocuaderno.jpg',
      noche: '/img/noche.jpg',
      ground: '/img/piso_02.png',
      piso1: '/img/piso_viro_ini.png',
      piso2: '/img/piso_viro_med.png',
      piso3: '/img/piso_viro_fin.png',

      techo1: '/img/techo_viro_ini.png',
      techo2: '/img/techo_viro_med.png',
      techo3: '/img/techo_viro_fin.png',

      caja: '/img/caja.png',

      star: 'https://labs.phaser.io/assets/sprites/star.png',
      player_caminando: '/img/player_caminando.png',
      player_volando: '/img/player_volando.png',
      player_muriendo: '/img/player_muriendo.png',
      meta: '/img/meta.png',
      lazo: '/img/lazo.png',
      caminorapidonotomar: '/img/caminorapidonotomar.png',
      carteltunel: 'img/carteltunel.png',
      cartelpeligro: 'img/cartelpeligro.png',
      cartelseguro: 'img/cartelseguro.png',
      texto_porquetequedasenviamuerta: 'img/texto_porquetequedasenviamuerta.png',
      texto_porquenoteanimasadespegar: 'img/texto_porquenoteanimasadespegar.png',
      yoseporque: 'img/yoseporque.png',
      carteldescarrilados: 'img/carteldescarrilados.png',
      tequededasenlapuerta: 'img/tequededasenlapuerta.png',
      tapasui: 'img/tapasui.png',
      tapaseru: 'img/tapaseru.png',
      tapamaquina: 'img/tapamaquina.png',
      texto_aprendiaserformalycortes: 'img/texto_aprendiaserformalycortes.png',
      texto_tacuhelas: 'img/texto_tacuhelas.png',
      tapaclicks: 'img/tapaclicks.png',
      tapalagrima: 'img/tapalagrima.png',
      charlypileta: 'img/charlypileta.png',
      saynomore: 'img/saynomore.png',

      
    };
  
    public static obtenerConstante(nombre: string): string | undefined {
      return this.Direcciones[nombre];
    }
  }