const { PlataformasHorizontales, LargoPlataforma, Plataforma, Texto, Imagen } = require('./plataforma');

function SumarX(plataformas, x) {
    plataformas.forEach(p => {
        p.plataformas.forEach(plataforma => {
            plataforma.desdeX += x;
            plataforma.hastaX += x;
            p.obstaculos.forEach(obstaculo => {
                obstaculo.desdeX += x;
            });

        });
    });
    return plataformas;
}


function UltimoX(plataformas) {
    let ultimo = 0;
    plataformas.forEach(p => {
        let x = p.UltimoX();
        if (x > ultimo) {
            ultimo = x;
        }
        
    });
    return ultimo;
}

///ZigZag de 2 , 2 seguidas en el techo y una arriba
function AgregarModeloCajas1(plataformas, desdeX = 0) {
    let piso_principal = plataformas[0];
    let techo_principal = plataformas[1];
    piso_principal.AgregarCaja(desdeX);
    techo_principal.AgregarCaja(desdeX + 200, -1);
    piso_principal.AgregarCaja(desdeX + 400);
    techo_principal.AgregarCaja(desdeX + 600, -1);
    piso_principal.AgregarCaja(desdeX + 800);
    piso_principal.AgregarCaja(desdeX + 1000);
    techo_principal.AgregarCaja(desdeX + 1200, -1);
    piso_principal.AgregarCaja(desdeX + 1400);
    return plataformas;

}

function AgregarCajaFinal(plataforma, final_menos = 0, altura = 0) {
    let ultimox = plataforma.UltimoX();
    plataforma.AgregarCaja(ultimox - final_menos, altura);
    return plataforma;
}


function AgregarPilaCajas(plataforma, posicion, desde, hasta) 
{
    if (desde < hasta) {
        for (let altura = desde; altura <= hasta; altura += 1) {
            plataforma.AgregarCaja(posicion, altura);
        }
    } else {
        for (let altura = desde; altura >= hasta; altura -= 1) {
            plataforma.AgregarCaja(posicion, altura);
        }
    }
    return plataforma;

}




function PistoYTecho(y_piso = 400,y_techo = 230, xdesde_piso = 230, xhasta_piso = 1000, xdesde_techo = 0, xhasta_techo = 1000) {   
    
    let plataformas = [];
    
    let piso_principal = new PlataformasHorizontales(y_piso, "piso");
    let techo_principal = new PlataformasHorizontales(y_techo, "techo");
    
    plataformas.push(piso_principal);
    plataformas.push(techo_principal);

    piso_principal.AgregarPlataforma(xdesde_piso, xhasta_piso);
    techo_principal.AgregarPlataforma(xdesde_techo, xhasta_techo);
    return plataformas;
}


function SoloPiso(y_piso = 400, xdesde_piso = 230, xhasta_piso = 1000, tipo = "piso", multiplicador_velocidad = 1) {   
    
    let plataformas = [];    
    let piso = new PlataformasHorizontales(y_piso, tipo);
    if (multiplicador_velocidad != 1) {
        piso.multiplicador_velocidad = multiplicador_velocidad;
    }
    plataformas.push(piso);
    piso.AgregarPlataforma(xdesde_piso, xhasta_piso);
    return plataformas;
}




function EmbudoAcendente1() {
    
    let plataformas = [];
    
    let piso_1 = new PlataformasHorizontales(460, "piso");
    let piso_2 = new PlataformasHorizontales(500, "piso");
    let piso_3 = new PlataformasHorizontales(550, "piso");
    let techo_1 = new PlataformasHorizontales(210, "techo");
    let techo_2 = new PlataformasHorizontales(180, "techo");
    let techo_3 = new PlataformasHorizontales(140, "techo");

    piso_1.AgregarPlataforma(0, 600);
    techo_1.AgregarPlataforma(0, 600);
    piso_2.AgregarPlataforma(500, 1200);
    techo_2.AgregarPlataforma(500, 1200);
    piso_3.AgregarPlataforma(1100, 2400);
    techo_3.AgregarPlataforma(1100, 2400);


    plataformas.push(piso_1);
    plataformas.push(piso_2);
    plataformas.push(piso_3);
    plataformas.push(techo_1);
    plataformas.push(techo_2);
    plataformas.push(techo_3);

    return plataformas;
}

function EmbudoDendente1(piso1, techo1, tam_escalon, tam_plata = 600, tam_salto = -100) {
    
    let plataformas = [];
    
    let piso_1 = new PlataformasHorizontales(piso1, "piso");
    let piso_2 = new PlataformasHorizontales(piso1 - tam_escalon, "piso");
    let piso_3 = new PlataformasHorizontales(piso1 - (2 * tam_escalon), "piso");

    let techo_3 = new PlataformasHorizontales(techo1 + (2 * tam_escalon), "techo");
    let techo_2 = new PlataformasHorizontales(techo1 + tam_escalon, "techo");
    let techo_1 = new PlataformasHorizontales(techo1, "techo");

    piso_1.AgregarPlataforma(0, tam_plata);
    techo_1.AgregarPlataforma(0, tam_plata);
    piso_2.AgregarPlataforma(tam_plata + tam_salto, tam_plata * 2);
    techo_2.AgregarPlataforma(tam_plata + tam_salto, tam_plata * 2);
    piso_3.AgregarPlataforma((tam_plata * 2) + tam_salto, tam_plata * 3 );
    techo_3.AgregarPlataforma((tam_plata * 2) + tam_salto, tam_plata * 3);


    plataformas.push(piso_1);
    plataformas.push(piso_2);
    plataformas.push(piso_3);
    plataformas.push(techo_1);
    plataformas.push(techo_2);
    plataformas.push(techo_3);

    return plataformas;
}

function ZigZagAgujeros(plataforma, desdeX = 600, hastaX = 1800, agujero = 20, espacio = 200) {
    for (let x = desdeX; x < hastaX; x += espacio + agujero) {
        plataforma.QuitarPlataforma(x, x + agujero);
    }
    return plataforma;   

}


function HacerSerruchoDePilas(plataformas, desdeX = 800, hastaX = 2600, espacio = 200, desde = 0, hasta = 1, desde_techo = 0, hasta_techo = 1) {
    
    for (let x = desdeX; x < hastaX; x += espacio) {
        plataformas[0] = AgregarPilaCajas(plataformas[0], x, desde, hasta);
        plataformas[1] = AgregarPilaCajas(plataformas[1], x + (espacio / 2), desde_techo, hasta_techo);
    }
    return plataformas;
}

module.exports = {
    SumarX,
    UltimoX,
    AgregarModeloCajas1,
    AgregarCajaFinal,
    AgregarPilaCajas,
    PistoYTecho,
    SoloPiso,
    EmbudoAcendente1,
    EmbudoDendente1,
    ZigZagAgujeros,
    HacerSerruchoDePilas
};