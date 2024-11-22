const fs = require('fs');

// index.js
const { PlataformasHorizontales, LargoPlataforma, Plataforma, Texto, Imagen } = require('./plataforma');
const {
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
} = require('./funciones');


function HacerMapaModo2(archivo_mapa) {

    const mapa = {
        nombre: "Mapa de ejemplo",
        largo: 40000,
        fondo: "sky",
        cancion: "cancion",
        plataformas: [],
        obstaculos: [],
        textos: [],
        obstaculos_mortales: [],
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


module.exports = { HacerMapaModo2 };