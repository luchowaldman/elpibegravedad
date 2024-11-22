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

function HacerMapaModo1(archivo_mapa) {

    const mapa = {
        nombre: "Mapa de ejemplo",
        largo: 20000,
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

    let ultimoX = 0;

    /* COMIENZO */
    let plataformas = [];   
    
    // Piso inicial
    ultimoX = UltimoX(plataformas);
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

module.exports = { HacerMapaModo1 };