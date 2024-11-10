import { Plataforma } from "../Plataforma";
import Piso from "./piso";
import PisoDoble from "./pisodoble";
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
        // Puedes agregar más condiciones para otros tipos de plataformas aquí
        return null;
      }
}