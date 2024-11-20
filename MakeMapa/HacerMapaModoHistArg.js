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


function HacerMapaModoHistoria(archivo_mapa) {

    const mapa = {
        nombre: "Historia Argentina",
        largo: 40000,
        fondo: "sky",
        cancion: "cancion",
        plataformas: [],
        obstaculos: [],
        imagenes: [],
        textos: [],
        inicio_jugadores: { x: 250, y: 350 }, 
        meta: {
          x: 12500,
          y: 0,
          alto: 600
        }
    };


    
    let plataformas = [];   
    let ultimoX = 0;
    
    
    // 1800
    ultimoX = UltimoX(plataformas);
    let solopiso = SoloPiso(420, 0, 2700, "pisodoble");
    let solopiso2 = SoloPiso(210, 1000, 2700, "pisoreductor", 0.5);
    let solopisom2 = SoloPiso(80, 400, 2700, "pisomultiplicador", 2);
/*
    mapa.imagenes.push(new Imagen("invaciones1", ultimoX + 1000, 40, 200, 200));
    mapa.imagenes.push(new Imagen("invaciones2", ultimoX + 1800, 240, 200, 200));
*/
    mapa.textos.push(new Texto("Buenos Ayres, Virreynato del Plata. 1800", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    plataformas.push(...SumarX(solopiso2, ultimoX));
    plataformas.push(...SumarX(solopisom2, ultimoX));
    plataformas.push(...SumarX(solopiso, ultimoX));

    // 1810
    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(380, 0, 2700, "pisodoble");
    mapa.textos.push(new Texto("Buenos Aires. 1810", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    plataformas.push(...SumarX(solopiso, ultimoX));


    // 1820
    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(380, 0, 2700, "pisodoble");
    mapa.textos.push(new Texto("Buenos Aires. 1820", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    plataformas.push(...SumarX(solopiso, ultimoX));



    // 1850
    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(380, 0, 2700, "pisodoble");
    mapa.textos.push(new Texto("Buenos Aires. 1850", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    plataformas.push(...SumarX(solopiso, ultimoX));

    // 19000
    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(380, 0, 2700, "pisodoble");
    mapa.textos.push(new Texto("Buenos Aires. 1900", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    plataformas.push(...SumarX(solopiso, ultimoX));

        // 1950
        ultimoX = UltimoX(plataformas);
        solopiso = SoloPiso(380, 0, 2700, "pisodoble");
        mapa.textos.push(new Texto("Buenos Aires. 1950", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
        plataformas.push(...SumarX(solopiso, ultimoX));

    // 2000
    ultimoX = UltimoX(plataformas);
    solopiso = SoloPiso(380, 0, 2700, "pisodoble");

    mapa.textos.push(new Texto("Buenos Aires. 2000", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    plataformas.push(...SumarX(solopiso, ultimoX));

        // 2050
        ultimoX = UltimoX(plataformas);
        solopiso = SoloPiso(380, 0, 2700, "pisodoble");
        mapa.textos.push(new Texto("Buenos Aires. 2050", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
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


module.exports = { HacerMapaModoHistoria };