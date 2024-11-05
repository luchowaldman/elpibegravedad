const fs = require('fs');

// index.js
const { PlataformasHorizontales, LargoPlataforma, Plataforma, Obstaculo, Imagen } = require('./plataforma');


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


function SoloPiso(y_piso = 400, xdesde_piso = 230, xhasta_piso = 1000) {   
    
    let plataformas = [];    
    let piso = new PlataformasHorizontales(y_piso, "piso");
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

function ZigZagAgujeros(plataforma, desdeX = 600, hastaX = 1800, agujero = 20, espacio = 200) {
    for (let x = desdeX; x < hastaX; x += espacio + agujero) {
        plataforma.QuitarPlataforma(x, x + agujero);
    }
    return plataforma;   

}

async function main() {


    const mapa = {
        nombre: "Mapa de ejemplo",
        largo: 20000,
        fondo: "sky",
        cancion: "cancion",
        plataformas: [],
        obstaculos: [],
        imagenes: [],
        inicio_jugadores: { x: 50, y: 350 }, 
        meta: {
          x: 12500,
          y: 0,
          alto: 600
        }
    };


    /* COMIENZO */
    let plataformas = [];   
    
    // Piso inicial
    let solopiso = SoloPiso(400, 0, 1000);
    plataformas.push(...SumarX(solopiso, UltimoX(plataformas)));


    // INICIO    
    let ultimoX = UltimoX(plataformas);
    let inicio = PistoYTecho(400, 200, 0, 2200, 250, 2000)
    inicio = AgregarModeloCajas1(inicio, 400);
    plataformas.push(...SumarX(inicio, ultimoX));
    mapa.imagenes.push(new Imagen("carteltunel", ultimoX + 10, 180, 200, 200));

    // EMBUDO 1
    let embudo1 = EmbudoAcendente1();
    embudo1[0] = AgregarCajaFinal(embudo1[0], 200, 0);
    plataformas.push(...SumarX(embudo1, UltimoX(plataformas)));
    

    // TRAMPA CAMINO 1
    ultimoX = UltimoX(plataformas);
    let cajas_trapa1 = SumarX(AgregarModeloCajas1(PistoYTecho(480, 330, 100, 1800, -100, 1800), 130), ultimoX);
    cajas_trapa1[1] = AgregarCajaFinal(cajas_trapa1[1], 200, 0);
    plataformas.push(...cajas_trapa1);
    mapa.imagenes.push(new Imagen("caminorapidonotomar", ultimoX - 520, 140, 200, 200));

    // EMBUDO 2 SIN TECHO
    ultimoX = UltimoX(plataformas);
    let embudosinpsio = EmbudoAcendente1();
    embudosinpsio.pop();
    plataformas.push(...SumarX(embudosinpsio, ultimoX));





    // CaminoPeligroso
    ultimoX = UltimoX(plataformas);
    let caminopeligroso = PistoYTecho(200, 50, 400, 3500, 0, 3500);
    mapa.imagenes.push(new Imagen("cartelpeligro", ultimoX + 10, 40, 200, 200));
    caminopeligroso[0] = ZigZagAgujeros(caminopeligroso[0], 800, 3500, 130, 600);
    caminopeligroso[1] = ZigZagAgujeros(caminopeligroso[1], 600, 3500, 70, 400);
    plataformas.push(...SumarX(caminopeligroso, ultimoX));

    // CAMINO seguro
    let caminoseguro = PistoYTecho(590, 400, 0, 3500, 600, 3500);
    mapa.imagenes.push(new Imagen("cartelseguro", ultimoX + 330, 340, 200, 200));
    caminoseguro[0] = AgregarPilaCajas(caminoseguro[0], 800, 0, 1);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 1000, -1, -2);
    caminoseguro[0] = AgregarPilaCajas(caminoseguro[0], 1200, 0, 1);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 1400, -1, -2);
    caminoseguro[0] = AgregarPilaCajas(caminoseguro[0], 1600, 0, 1);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 1800, -1, -2);
    caminoseguro[0] = AgregarPilaCajas(caminoseguro[0], 2000, 0, 1);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 2200, -1, -2);
    caminoseguro[0] = AgregarPilaCajas(caminoseguro[0], 2400, 0, 1);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 2600, -1, -2);
    //Pilas seguridad camino del medio
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 590, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 1090, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 1790, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 2490, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 3390, 0, 3);
    plataformas.push(...SumarX(caminoseguro, ultimoX));


    solopiso = SoloPiso(590, 0, 1000);
    plataformas.push(...SumarX(solopiso, UltimoX(plataformas)));

    ultimoX = UltimoX(plataformas);
    inicio = PistoYTecho(590, 200, 0, 3000, 200, 3000)
    plataformas.push(...SumarX(inicio, ultimoX));
    mapa.imagenes.push(new Imagen("carteltunel", ultimoX + 600, 380, 200, 200));

    mapa.meta.x = UltimoX(plataformas);
    plataformas.forEach(p => {
        mapa.plataformas.push(...p.getPlataformas());
        mapa.obstaculos.push(...p.obstaculos);
    });


    

    const jsonContent = JSON.stringify(mapa, null, 2);
    const archivo_mapa = "mapa1";
    fs.writeFileSync(`..\\cliente\\public\\mapas\\${archivo_mapa}.json`, jsonContent, 'utf8');
    fs.writeFileSync(`..\\server\\mapas\\${archivo_mapa}.json`, jsonContent, 'utf8');

    console.log(`Archivo ${archivo_mapa}.json creado con éxito`);
}

main();
