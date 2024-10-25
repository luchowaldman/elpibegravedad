const fs = require('fs');


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

    AgregarCaja(posicion, altura = 0) {
        let change_alt = (altura * 50) + 50;
        if (altura < 0) {
            change_alt = ((altura + 1) * 50) - this.largo;
        }
        this.obstaculos.push(new Obstaculo("caja", `caja_${this.nro_caja++}`, posicion, this.y - change_alt, 50, 50));

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

    getPlataformas() {
        let ret = [];
        this.plataformas.forEach(plataforma => {
            ret.push(new Plataforma(this.tipo, plataforma.desdeX, this.y, plataforma.hastaX, this.y, this.largo));
        });
        return ret;
    }
}



function zigzagCAJA(piso1, piso2, desde, hasta, distancia) {
    for (let x = desde; x < hasta; x += distancia) {
        piso1.AgregarCaja(x);
        piso2.AgregarCaja(x + (distancia / 2), -1);
    }

}

let plataformas = [];



function AgregarL(piso, desdeX) {
    
    piso.AgregarCaja(desdeX);
    piso.AgregarCaja(desdeX + 50);
    piso.AgregarCaja(desdeX + 100);
    piso.AgregarCaja(desdeX + 100, 1);
}
async function main() {
    const mapa = {
        nombre: "Mapa de ejemplo",
        largo: 20000,
        fondo: "sky",
        cancion: "cancion",
        plataformas: [],
        obstaculos: [],
        inicio_jugadores: { x: 50, y: 50 }, 
        meta: {
          x: 2500,
          y: 0,
          alto: 600
        }
    };


    let piso1 = new PlataformasHorizontales(490, "piso");
    let piso2 = new PlataformasHorizontales(120, "techo");
    plataformas.push(piso1);
    plataformas.push(piso2);



    piso1.AgregarPlataforma(0, 2400);
    piso2.AgregarPlataforma(0, 2400);
    
    AgregarL(piso1, 400);
    piso2.AgregarCaja(300, -1);
    zigzagCAJA(piso1, piso2, 700, 1600, 230);

    // Agrego pozos
    piso1.QuitarPlataforma(1200, 1400);
    piso2.QuitarPlataforma(1700, 2000);

    

    let piso_par1_1 = new PlataformasHorizontales(20, "techo");
    let piso_par1_2 = new PlataformasHorizontales(300, "piso");
    let piso_par1_3 = new PlataformasHorizontales(540, "piso");
    plataformas.push(piso_par1_1);
    plataformas.push(piso_par1_2);
    plataformas.push(piso_par1_3);

    piso_par1_1.AgregarPlataforma(2700, 6000);
    piso_par1_2.AgregarPlataforma(2400, 6000);
    piso_par1_3.AgregarPlataforma(2100, 6000);
    
    zigzagCAJA(piso_par1_2, piso_par1_1, 2900, 5000, 600);    
    zigzagCAJA(piso_par1_3, piso_par1_2, 2700, 5100, 330);
    
    piso_par1_2.QuitarPlataforma(3600, 3800);
    piso_par1_2.QuitarPlataforma(4240, 4400);
    piso_par1_1.QuitarPlataforma(4540, 4600);

    plataformas.forEach(p => {
        mapa.plataformas.push(...p.getPlataformas());
        mapa.obstaculos.push(...p.obstaculos);
    });


    const jsonContent = JSON.stringify(mapa, null, 2);
    const archivo_mapa = "mapa_sej";
    fs.writeFileSync(`..\\cliente\\public\\mapas\\${archivo_mapa}.json`, jsonContent, 'utf8');

    console.log(`Archivo ${archivo_mapa}.json creado con éxito`);
}

main();
