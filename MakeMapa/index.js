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
function AgregarModeloCajas1(plataformas, desdeX = 1200) {
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


function Inicio1(y_piso = 400, y_techo = 230) {   
    
    let plataformas = [];
    let piso_principal = new PlataformasHorizontales(y_piso, "piso");
    let techo_principal = new PlataformasHorizontales(y_techo, "techo");
    piso_principal.AgregarPlataforma(0, 3000);
    techo_principal.AgregarPlataforma(1000, 2600);
    
    plataformas.push(piso_principal);
    plataformas.push(techo_principal);
   return AgregarModeloCajas1(plataformas);
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
    
    
    plataformas.push(...Inicio1());
    mapa.imagenes.push(new Imagen("carteltunel", 600, 180, 200, 200));


    plataformas.push(...SumarX(EmbudoAcendente1(), UltimoX(plataformas)));


    let ultimoX = UltimoX(plataformas);
    let cajas_trapa1 = SumarX(AgregarModeloCajas1(PistoYTecho(480, 330, 100, 1800, -100, 1800), 130), ultimoX);
    cajas_trapa1[1] = AgregarCajaFinal(cajas_trapa1[1], 200, 0);
    plataformas.push(...cajas_trapa1);
    mapa.imagenes.push(new Imagen("caminorapidonotomar", ultimoX + 20, 130, 200, 200));


    let embudosinpsio = EmbudoAcendente1();
    embudosinpsio.pop();
    plataformas.push(...SumarX(embudosinpsio, UltimoX(plataformas)));

    mapa.meta.x = UltimoX(plataformas);
    plataformas.forEach(p => {
        mapa.plataformas.push(...p.getPlataformas());
        mapa.obstaculos.push(...p.obstaculos);
    });


    const jsonContent = JSON.stringify(mapa, null, 2);
    const archivo_mapa = "mapa1";
    fs.writeFileSync(`..\\cliente\\public\\mapas\\${archivo_mapa}.json`, jsonContent, 'utf8');

    console.log(`Archivo ${archivo_mapa}.json creado con éxito`);
}

main();
