import { graficoJuego } from './modelo/graficoJuego';
import { Mapa } from './modelo/mapa';
const mapa: Mapa = new Mapa();
const graficos: graficoJuego = (new graficoJuego());


document.addEventListener('DOMContentLoaded', () => {
    
    
    const rangeCamara = document.getElementById('rangeCamara') as HTMLInputElement;
    if (rangeCamara) {
        rangeCamara.addEventListener('input', () => {
            graficos.setPosicionCamara(parseInt(rangeCamara.value));
        });
        console.log("rangeInput", rangeCamara);
        
    }
    
});




const urlParams = new URLSearchParams(window.location.search);
let mapaParam = urlParams.get('mapa');
if (mapaParam) {
    mapaParam = `./mapas/${mapaParam}.json`;
} else {
    mapaParam = "./mapas/mapa1.json";
}
await mapa.cargarMapa(mapaParam);
mapa.cargarImagenes(graficos);
await graficos.init();


setTimeout(() => {
    mapa.dibujarMapa(graficos);    
}, 1000);


