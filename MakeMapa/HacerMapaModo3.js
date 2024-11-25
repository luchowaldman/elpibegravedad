const fs = require('fs');

// index.js
const { PlataformasHorizontales, LargoPlataforma, Plataforma, Texto, Imagen, Obstaculo } = require('./plataforma');
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


function HacerMapaModo3(archivo_mapa) {

    const mapa = {
        nombre: "Historia Argentina",
        largo: 40000,
        fondo: "sky",
        cancion: "cancion",
        plataformas: [],
        obstaculos: [],
        imagenes: [],
        textos: [],
        obstaculos_mortales: [],
        inicio_jugadores: { x: 150, y: 350 }, 
        meta: {
          x: 12500,
          y: 0,
          alto: 600
        }
    };


    
    let plataformas = [];   
    let ultimoX = 0;
    
    ultimoX = UltimoX(plataformas);
    let solopiso1 = SoloPiso(320, 0, 1000, "pisodoble");
    let solopiso2 = SoloPiso(170, 500, 1000, "pisodoble");    
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinches", "pinche1", ultimoX + 700, 310, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(solopiso2, ultimoX));
    mapa.textos.push(new Texto("Mapa Nro 3, Vuelta 1/9", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));    
    ultimoX = UltimoX(plataformas);
    let pisored = SoloPiso(60, 0, 400, "pisoreductor", 0.5);
    let pisomul = SoloPiso(400, 0, 400, "pisomultiplicador", 2);    
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);   
    pisored = SoloPiso(500, 0, 600, "pisoreductor", 0.5);
    pisomul = SoloPiso(10, 0, 600, "pisomultiplicador", 2);    
    solopiso1 = SoloPiso(260, 0, 600, "pisodoble");
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 270, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);


    solopiso1 = SoloPiso(320, 0, 500, "pisodoble");
    solopiso2 = SoloPiso(170, 0, 500, "pisodoble");    
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 330, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(solopiso2, ultimoX));    
    mapa.textos.push(new Texto("Mapa Nro 3, Vuelta 2/9", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    ultimoX = UltimoX(plataformas);
    pisored = SoloPiso(400, 0, 400, "pisoreductor", 0.5);
    pisomul = SoloPiso(60, 0, 400, "pisomultiplicador", 2);    
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);    
    pisored = SoloPiso(500, 0, 600, "pisoreductor", 0.5);
    pisomul = SoloPiso(10, 0, 600, "pisomultiplicador", 2);    
    solopiso1 = SoloPiso(260, 0, 600, "pisodoble");
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 270, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);


    

    solopiso1 = SoloPiso(320, 0, 500, "pisodoble");
    solopiso2 = SoloPiso(170, 0, 500, "pisodoble");    
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 330, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(solopiso2, ultimoX));    
    mapa.textos.push(new Texto("Mapa Nro 3, Vuelta 3/9", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    ultimoX = UltimoX(plataformas);
    pisored = SoloPiso(400, 0, 400, "pisoreductor", 0.5);
    pisomul = SoloPiso(60, 0, 400, "pisomultiplicador", 2);    
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);    
    pisored = SoloPiso(500, 0, 600, "pisoreductor", 0.5);
    pisomul = SoloPiso(10, 0, 600, "pisomultiplicador", 2);    
    solopiso1 = SoloPiso(260, 0, 600, "pisodoble");
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 270, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);




    solopiso1 = SoloPiso(320, 0, 500, "pisodoble");
    solopiso2 = SoloPiso(170, 0, 500, "pisodoble");    
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 330, 100, 10));
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinches", "pinche1", ultimoX + 200, 310, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(solopiso2, ultimoX));    
    mapa.textos.push(new Texto("Mapa Nro 3, Vuelta 4/9", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    ultimoX = UltimoX(plataformas);
    pisored = SoloPiso(400, 0, 400, "pisoreductor", 0.5);
    pisomul = SoloPiso(60, 0, 400, "pisomultiplicador", 2);    
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);    
    pisored = SoloPiso(500, 0, 600, "pisoreductor", 0.5);
    pisomul = SoloPiso(10, 0, 600, "pisomultiplicador", 2);    
    solopiso1 = SoloPiso(260, 0, 600, "pisodoble");
    //mapa.obstaculos_mortales.push(new Obstaculo("PisoPinches", "pinche1", ultimoX + 200, 250, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(pisored, ultimoX));
   // plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);


    

    solopiso1 = SoloPiso(320, 0, 500, "pisodoble");
    solopiso2 = SoloPiso(170, 0, 500, "pisodoble");    
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 330, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(solopiso2, ultimoX));    
    mapa.textos.push(new Texto("Mapa Nro 3, Vuelta 5/9", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    ultimoX = UltimoX(plataformas);
    pisored = SoloPiso(400, 0, 400, "pisoreductor", 0.5);
    pisomul = SoloPiso(60, 0, 400, "pisomultiplicador", 2);    
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);    
    pisored = SoloPiso(500, 0, 600, "pisoreductor", 0.5);
    pisomul = SoloPiso(10, 0, 600, "pisomultiplicador", 2);    
    solopiso1 = SoloPiso(260, 0, 600, "pisodoble");
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 270, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);


    

    solopiso1 = SoloPiso(320, 0, 500, "pisodoble");
    solopiso2 = SoloPiso(170, 0, 500, "pisodoble");    
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 330, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(solopiso2, ultimoX));    
    mapa.textos.push(new Texto("Mapa Nro 3, Vuelta 6/9", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    ultimoX = UltimoX(plataformas);
    pisored = SoloPiso(400, 0, 400, "pisomultiplicador", 0.5);
    pisomul = SoloPiso(60, 0, 400, "pisoreductor", 2);    
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);    
    pisored = SoloPiso(500, 0, 600, "pisoreductor", 0.5);
    pisomul = SoloPiso(10, 0, 600, "pisomultiplicador", 2);    
    solopiso1 = SoloPiso(260, 0, 600, "pisodoble");
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 270, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    //plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);


    solopiso1 = SoloPiso(320, 0, 500, "pisodoble");
    solopiso2 = SoloPiso(170, 0, 500, "pisodoble");    
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 330, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    //plataformas.push(...SumarX(solopiso2, ultimoX));    
    mapa.textos.push(new Texto("Mapa Nro 3, Vuelta 7/9", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    ultimoX = UltimoX(plataformas);
    pisored = SoloPiso(400, 0, 400, "pisomultiplicador", 0.5);
    pisomul = SoloPiso(60, 0, 400, "pisoreductor", 2);    
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);    
    pisored = SoloPiso(500, 0, 600, "pisoreductor", 0.5);
    pisomul = SoloPiso(10, 0, 600, "pisomultiplicador", 2);    
    solopiso1 = SoloPiso(260, 0, 600, "pisodoble");
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 270, 100, 10));
    //plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);



    solopiso1 = SoloPiso(320, 0, 500, "pisodoble");
    solopiso2 = SoloPiso(170, 0, 500, "pisodoble");    
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 180, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(solopiso2, ultimoX));    
    mapa.textos.push(new Texto("Mapa Nro 3, Vuelta 8/9", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    ultimoX = UltimoX(plataformas);
    pisored = SoloPiso(60, 0, 400, "pisomultiplicador", 0.5);
    pisomul = SoloPiso(400, 0, 400, "pisoreductor", 2);    
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);    
    pisored = SoloPiso(500, 0, 600, "pisoreductor", 0.5);
    pisomul = SoloPiso(10, 0, 600, "pisomultiplicador", 2);    
    solopiso1 = SoloPiso(260, 0, 600, "pisodoble");
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 270, 100, 10));
    //plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);

    
    solopiso1 = SoloPiso(320, 0, 500, "pisodoble");
    solopiso2 = SoloPiso(170, 0, 500, "pisodoble");    
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 330, 100, 10));
    plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(solopiso2, ultimoX));    
    mapa.textos.push(new Texto("Mapa Nro 3, Vuelta 9/9", ultimoX + 100, 500, "30px", "blue", "FriedNuget"));
    ultimoX = UltimoX(plataformas);
    pisored = SoloPiso(400, 0, 400, "pisomultiplicador", 0.5);
    pisomul = SoloPiso(60, 0, 400, "pisoreductor", 2);    
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
    ultimoX = UltimoX(plataformas);    
    pisored = SoloPiso(500, 0, 600, "pisoreductor", 0.5);
    pisomul = SoloPiso(10, 0, 600, "pisomultiplicador", 2);    
    solopiso1 = SoloPiso(260, 0, 600, "pisodoble");
    mapa.obstaculos_mortales.push(new Obstaculo("PisoPinchesInv", "pinche1", ultimoX + 200, 270, 100, 10));
    //plataformas.push(...SumarX(solopiso1, ultimoX));
    plataformas.push(...SumarX(pisored, ultimoX));
    plataformas.push(...SumarX(pisomul, ultimoX));
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


module.exports = { HacerMapaModo3 };