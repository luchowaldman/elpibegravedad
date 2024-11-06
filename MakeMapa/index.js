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


function HacerPila(plataforma) {

}
function HacerSerruchoDePilas(plataformas, desdeX = 800, hastaX = 2600, espacio = 200, desde = 0, hasta = 1, desde_techo = 0, hasta_techo = 1) {
    
    for (let x = desdeX; x < hastaX; x += espacio) {
        plataformas[0] = AgregarPilaCajas(plataformas[0], x, desde, hasta);
        plataformas[1] = AgregarPilaCajas(plataformas[1], x + (espacio / 2), desde_techo, hasta_techo);
    }
    return plataformas;
}


function HacerMapaModo1(archivo_mapa) {

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
    let ultimoX = UltimoX(plataformas);
    let solopiso = SoloPiso(400, 0, 1000);
    plataformas.push(...SumarX(solopiso, ultimoX));


    // INICIO    
    let inicio = PistoYTecho(400, 200, 0, 2200, 250, 2000)
    ultimoX = UltimoX(plataformas);
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
    caminoseguro = HacerSerruchoDePilas(caminoseguro, 800, 3000, 520, 0, 1, -1, -2);

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
    fs.writeFileSync(`..\\cliente\\public\\mapas\\${archivo_mapa}.json`, jsonContent, 'utf8');
    fs.writeFileSync(`..\\server\\mapas\\${archivo_mapa}.json`, jsonContent, 'utf8');

    console.log(`Archivo ${archivo_mapa}.json creado con éxito`);
}



function HacerMapaModo2(archivo_mapa) {

    const mapa = {
        nombre: "Mapa de ejemplo",
        largo: 40000,
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


    
    let plataformas = [];   
    let ultimoX = 0;
    ultimoX = UltimoX(plataformas);
    // Piso inicial
    let solopiso = SoloPiso(500, 0, 2700);
    plataformas.push(...SumarX(solopiso, ultimoX));
    mapa.imagenes.push(new Imagen("texto_porquetequedasenviamuerta", ultimoX + 210, 450, 500, 50));
    mapa.imagenes.push(new Imagen("texto_porquetequedasenviamuerta", ultimoX + 910, 450, 500, 50));
    mapa.imagenes.push(new Imagen("texto_porquenoteanimasadespegar", ultimoX + 1610, 380, 500, 50));
    mapa.imagenes.push(new Imagen("partitura", ultimoX + 910, 180, 100, 100));
    mapa.imagenes.push(new Imagen("partitura", ultimoX + 1710, 120, 100, 100));
    mapa.imagenes.push(new Imagen("partitura", ultimoX + 1960, 240, 100, 100));
    
    mapa.imagenes.push(new Imagen("yoseporque", ultimoX + 2210, 200, 460, 50));
    // CaminoPeligroso
    ultimoX = UltimoX(plataformas);
    let caminopeligroso = PistoYTecho(200, 50, 400, 3500, 0, 3500);
    mapa.imagenes.push(new Imagen("carteldescarrilados", ultimoX + 10, 40, 200, 200));
    caminopeligroso[0] = ZigZagAgujeros(caminopeligroso[0], 800, 3500, 130, 600);
    caminopeligroso[1] = ZigZagAgujeros(caminopeligroso[1], 600, 3500, 70, 400);
    plataformas.push(...SumarX(caminopeligroso, ultimoX));
    // CAMINO seguro
    let caminoseguro = PistoYTecho(580, 400, 0, 3500, 600, 3500);
    mapa.imagenes.push(new Imagen("tequededasenlapuerta", ultimoX + 330, 340, 200, 200));
    caminoseguro = HacerSerruchoDePilas(caminoseguro, 800, 3000, 520, 0, 1, -1, -2);
    //Pilas seguridad camino del medio
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 590, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 1090, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 1790, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 2490, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 3390, 0, 3);
    
    mapa.imagenes.push(new Imagen("texto_hace4anios", ultimoX + 2560, 340, 500, 50));
    plataformas.push(...SumarX(caminoseguro, ultimoX));

    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(590, 0, 1500);
    mapa.imagenes.push(new Imagen("texto_porquetequedasenviamuerta", ultimoX + 210, 540, 500, 50));
    mapa.imagenes.push(new Imagen("texto_porquenoteanimasadespegar", ultimoX + 910, 540, 500, 50));
    mapa.imagenes.push(new Imagen("tapasui", ultimoX + 510, 200, 460, 50));
    plataformas.push(...SumarX(solopiso, ultimoX));


    ultimoX = UltimoX(plataformas);
    embudodecendente = EmbudoDendente1(590, 0, 80);
    plataformas.push(...SumarX(embudodecendente, ultimoX));
    

    // CaminoPeligroso
    ultimoX = UltimoX(plataformas);
    caminopeligroso = PistoYTecho(200, 50, 400, 3500, 0, 3500);
    mapa.imagenes.push(new Imagen("texto_tacuhelas", ultimoX + 10, 40, 200, 200));
    caminopeligroso[0] = ZigZagAgujeros(caminopeligroso[0], 800, 3500, 130, 600);
    caminopeligroso[1] = ZigZagAgujeros(caminopeligroso[1], 600, 3500, 70, 400);
    plataformas.push(...SumarX(caminopeligroso, ultimoX));
    // CAMINO seguro
    caminoseguro = PistoYTecho(590, 400, 0, 3500, 600, 3500);
    mapa.imagenes.push(new Imagen("texto_aprendiaserformalycortes", ultimoX + 330, 370, 200, 200));
    caminoseguro = HacerSerruchoDePilas(caminoseguro, 800, 3000, 520, 0, 1, -1, -2);
    //Pilas seguridad camino del medio
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 590, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 1090, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 1790, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 2490, 0, 3);
    caminoseguro[1] = AgregarPilaCajas(caminoseguro[1], 3390, 0, 3);
    plataformas.push(...SumarX(caminoseguro, ultimoX));



    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(360, 0, 1000);
    mapa.imagenes.push(new Imagen("tapamaquina", ultimoX + 400, 10, 500, 500));
    plataformas.push(...SumarX(solopiso, ultimoX));
    
    ultimoX = UltimoX(plataformas);
    let camino = PistoYTecho(500, 160, -200, 3000, -200, 2600);
    
    camino[0] = AgregarPilaCajas(camino[0], 470, 0, 4);
    camino[1] = AgregarPilaCajas(camino[1], 870, -1, -3);    
    camino[0] = AgregarPilaCajas(camino[0], 1300, 0, 4);
    camino[1] = AgregarPilaCajas(camino[1], 1570, -1, -4);    
    camino[0] = AgregarPilaCajas(camino[0], 2070, 0, 4);
    camino[1] = AgregarPilaCajas(camino[1], 2370, -1, -4);
    mapa.imagenes.push(new Imagen("tapaseru", ultimoX + 3000, 10, 500, 500));
    plataformas.push(...SumarX(camino, ultimoX));


//    ultimoX = UltimoX(plataformas);
//    solopiso = SoloPiso(500, 0, 300);
//    plataformas.push(...SumarX(solopiso, ultimoX));
    
    ultimoX = UltimoX(plataformas);
    embudodecendente = EmbudoDendente1(590, 10, 70, 800, 0);
    embudodecendente[1].AgregarCaja(700, -1)
    embudodecendente[2].AgregarCaja(800, -1)
    embudodecendente[4].AgregarCaja(900, 0)
    embudodecendente[5].AgregarCaja(1000, 0)
    plataformas.push(...SumarX(embudodecendente, ultimoX));


    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(360, -100, 1000);
    solopiso[0].AgregarCaja(-150, -1);
    solopiso[0].AgregarCaja(-150, -2);
    mapa.imagenes.push(new Imagen("tapaclicks", ultimoX + 200, 10, 500, 500));
    plataformas.push(...SumarX(solopiso, ultimoX));

    // CaminoPeligroso
    ultimoX = UltimoX(plataformas);
    caminopeligroso = PistoYTecho(360, 1, 0, 2020, 0, 2400);
    caminopeligroso[0] = ZigZagAgujeros(caminopeligroso[0], 300, 1500, 230, 550);
    caminopeligroso[1] = ZigZagAgujeros(caminopeligroso[1], 100, 1500, 70, 370);
    
    caminopeligroso[0] = AgregarPilaCajas(caminopeligroso[0], 1800, 0, 0);
    caminopeligroso[0] = AgregarPilaCajas(caminopeligroso[0], 1850, 0, 1);
    caminopeligroso[0] = AgregarPilaCajas(caminopeligroso[0], 1900, 0, 2);
    caminopeligroso[0] = AgregarPilaCajas(caminopeligroso[0], 1950, 0, 3);
    caminopeligroso[1] = AgregarPilaCajas(caminopeligroso[1], 2310, -1, -1);
    plataformas.push(...SumarX(caminopeligroso, ultimoX));


    
    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(180, -200, 1700);
    solopiso[0].AgregarCaja(-150, -1);
    mapa.imagenes.push(new Imagen("tapalagrima", ultimoX + 300, 260, 500, 500));
    mapa.imagenes.push(new Imagen("saynomore", ultimoX + 900, 270, 200, 200));
    plataformas.push(...SumarX(solopiso, ultimoX));


    
    
    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(580, 0, 1500);
    solopiso[0].AgregarCaja(-150, -1);
    mapa.imagenes.push(new Imagen("charlypileta", ultimoX + 100, 100, 200, 220));
    mapa.imagenes.push(new Imagen("charlypileta", ultimoX + 300, 300, 200, 220));
    mapa.imagenes.push(new Imagen("charlypileta", ultimoX + 400, 400, 200, 220));
    plataformas.push(...SumarX(solopiso, ultimoX));


    ultimoX = UltimoX(plataformas);
    mapa.largo = ultimoX + 200;
    mapa.meta.x = ultimoX - 100;
    plataformas.forEach(p => {
        mapa.plataformas.push(...p.getPlataformas());
        mapa.obstaculos.push(...p.obstaculos);
    });


    


    const jsonContent = JSON.stringify(mapa, null, 2);
    fs.writeFileSync(`..\\cliente\\public\\mapas\\${archivo_mapa}.json`, jsonContent, 'utf8');
    fs.writeFileSync(`..\\server\\mapas\\${archivo_mapa}.json`, jsonContent, 'utf8');

    console.log(`Archivo ${archivo_mapa}.json creado con éxito`);
}



async function main() {

    //HacerMapaModo1("mapa1");
    HacerMapaModo2("mapa1");
}

main();
