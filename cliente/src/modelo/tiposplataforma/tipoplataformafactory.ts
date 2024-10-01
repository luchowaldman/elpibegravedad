import Piso from "./piso";
import Techo from "./techo";

export default class TipoPlataformaFactory {

    static Crear(tipo: string, desdeX: number, desdeY: number, hastaX: number, hastaY: number) {
        if (tipo === "piso") {
          return new Piso(desdeX, desdeY, hastaX, hastaY);
        }
        if (tipo === "techo") {
          return new Techo(desdeX, desdeY, hastaX, hastaY);
        }
        // Puedes agregar más condiciones para otros tipos de plataformas aquí
        return null;
      }
}