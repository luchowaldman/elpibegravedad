export class AnimacionEntidadGrafica  {
  key: string;
  nombreImagen: string;
  startFrame: number;
  endFrame: number;
  frameRate: number;
  repeat: number;

  constructor(key: string, nombreImagen: string, startFrame: number, endFrame: number, frameRate: number, repeat: number) {
      this.key = key;
      this.nombreImagen = nombreImagen;
      this.startFrame = startFrame;
      this.endFrame = endFrame;
      this.frameRate = frameRate;
      this.repeat = repeat;
  }
}