export class Direcciones {
    private static readonly Direcciones: { [key: string]: string } = {
      cancion: 'audio/musica_juego.mp3',
      musica_charly: 'audio/musica_charly.mp3',
      PisoPinches: 'img/PisoPinches.png',
      PisoPinchesInv: 'img/PisoPinchesInv.png',
      sky: 'img/fondocuaderno.jpg',
      noche: 'img/noche.jpg',
      ground: 'img/piso_02.png',
      piso1: 'img/piso_viro_ini.png',
      piso2: 'img/piso_viro_med.png',
      piso3: 'img/piso_viro_fin.png',
      pisodoble1: 'img/piso_dob_ini.png',
      pisodoble2: 'img/piso_dob_med.png',
      pisodoble3: 'img/piso_dob_fin.png',

      techo1: 'img/techo_viro_ini.png',
      techo2: 'img/techo_viro_med.png',
      techo3: 'img/techo_viro_fin.png',
 
      caja: 'img/caja.png',

      star: 'https://labs.phaser.io/assets/sprites/star.png',
      player_caminando: 'img/player_caminando.png',
      player_volando: 'img/player_volando.png',
      player_muriendo: 'img/player_muriendo.png',
      player_festejando: 'img/player_festejando.png',
      
      meta: 'img/meta.png',
      lazo: 'img/lazo.png',
      caminorapidonotomar: 'img/caminorapidonotomar.png',
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
      partitura: 'img/partitura.png',
      texto_hace4anios: 'img/texto_hace4anios.png',
      banderainglesa: 'img/banderainglesa.png',
      invaciones1: 'img/invaciones1.png',
      invaciones2: 'img/invaciones2.png',
      piso_div_3: 'img/piso_rx-2_fin.png',
      piso_div_1: 'img/piso_rx-2_ini.png',
      piso_div_2: 'img/piso_rx-2_med.png',
      piso_mul_3: 'img/piso_rx2_fin.png',
      piso_mul_1: 'img/piso_rx2_ini.png',
      piso_mul_2: 'img/piso_rx2_med.png',

    };
  
    public static obtenerConstante(nombre: string): string | undefined {
      return this.Direcciones[nombre];
    }
  }