
class LargoPlataforma {
    constructor(desdeX, hastaX) {
        this.desdeX = desdeX;
        this.hastaX = hastaX;
    }
}

class Plataforma {
    constructor(tipo, desdeX, desdeY, hastaX, hastaY, alto) {
        this.tipo = tipo;
        this.desdeX = desdeX;
        this.desdeY = desdeY;
        this.hastaX = hastaX;
        this.hastaY = hastaY;
        this.alto = alto;
    }
}

class Obstaculo {
    constructor(tipo, id, desdeX, desdeY, largo, alto) {
        this.tipo = tipo;
        this.id = id;
        this.desdeX = desdeX;
        this.desdeY = desdeY;
        this.largo = largo;
        this.alto = alto;
    }
}

class Imagen {
    constructor(imagen, desdeX, desdeY, largo, alto) {
        this.imagen = imagen;
        this.desdeX = desdeX;
        this.desdeY = desdeY;
        this.largo = largo;
        this.alto = alto;
    }
}

class PlataformasHorizontales {
    y = 0;
    largo = 0;
    tipo = "piso";
    obstaculos = [];

    constructor(y, tipo, largo) {
        this.y = y;
        this.tipo = tipo;
        this.largo = largo;
        this.nro_caja = 1;
        if (!this.largo)
            this.largo = 10;
        this.plataformas = [];
    }

    AgregarPlataforma(desdeX, hastaX) {
        let nuevaPlataforma = new LargoPlataforma(desdeX, hastaX);
        this.plataformas.push(nuevaPlataforma);
        this.plataformas = this._unirPlataformas(this.plataformas);
    }

    QuitarPlataforma(desdeX, hastaX) {
        let nuevasPlataformas = [];
        for (let plataforma of this.plataformas) {
            if (plataforma.hastaX <= desdeX || plataforma.desdeX >= hastaX) {
                nuevasPlataformas.push(plataforma);
            } else {
                if (plataforma.desdeX < desdeX) {
                    nuevasPlataformas.push(new LargoPlataforma(plataforma.desdeX, desdeX));
                }
                if (plataforma.hastaX > hastaX) {
                    nuevasPlataformas.push(new LargoPlataforma(hastaX, plataforma.hastaX));
                }
            }
        }
        this.plataformas = nuevasPlataformas;
    }

    _unirPlataformas(plataformas) {
        if (plataformas.length === 0) return plataformas;
        plataformas.sort((a, b) => a.desdeX - b.desdeX);
        let unidas = [plataformas[0]];
        for (let i = 1; i < plataformas.length; i++) {
            let ultima = unidas[unidas.length - 1];
            let actual = plataformas[i];
            if (ultima.hastaX >= actual.desdeX) {
                ultima.hastaX = Math.max(ultima.hastaX, actual.hastaX);
            } else {
                unidas.push(actual);
            }
        }
        return unidas;
    }

    UltimoX() {
        let ultimo = 0;
        this.plataformas.forEach(plataforma => {
            if (plataforma.hastaX > ultimo) {
                ultimo = plataforma.hastaX;
            }
        });
        return ultimo;
    }

    
    AgregarCaja(posicion, altura = 0) {
        let change_alt = (altura * 50) + 50;
        if (altura < 0) {
            change_alt = ((altura + 1) * 50) - this.largo;
        }
        this.obstaculos.push(new Obstaculo("caja", `caja_${this.nro_caja++}`, posicion, this.y - change_alt, 50, 50));

    }

    getPlataformas() {
        let ret = [];
        this.plataformas.forEach(plataforma => {
            ret.push(new Plataforma(this.tipo, plataforma.desdeX, this.y, plataforma.hastaX, this.y, this.largo));
        });
        return ret;
    }
}



module.exports = { PlataformasHorizontales, LargoPlataforma, Plataforma, Obstaculo, Imagen };
