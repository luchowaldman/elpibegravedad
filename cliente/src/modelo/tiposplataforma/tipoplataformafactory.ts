import { Plataforma } from "../Mapa/Plataforma";
import Piso from "./piso";
import PisoDoble from "./pisodoble";
import PisoMultiplicador from "./pisomultiplicador";
import PisoReductor from "./pisoreductor";
import Techo from "./techo";

export default class TipoPlataformaFactory {

    static Crear(tipo: string, desdeX: number, desdeY: number, hastaX: number, hastaY: number, alto: number): Plataforma | null {
        if (tipo === "piso") {
          return new Piso(desdeX, desdeY, hastaX, hastaY, alto);
        }
        if (tipo === "techo") {
          return new Techo(desdeX, desdeY, hastaX, hastaY, alto);
        }
        if (tipo === "pisodoble") {
          return new PisoDoble(desdeX, desdeY, hastaX, hastaY, alto);
        }
        if (tipo === "pisoreductor") {
          return new PisoReductor(desdeX, desdeY, hastaX, hastaY, alto);
        }
        if (tipo === "pisomultiplicador") {
          return new PisoMultiplicador(desdeX, desdeY, hastaX, hastaY, alto);
        }
        // Puedes agregar más condiciones para otros tipos de plataformas aquí
        return null;
      }
}