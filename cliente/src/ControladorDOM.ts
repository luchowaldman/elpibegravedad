import { divMapa } from "./modelo/divMapa";

export class ControladorDOM {

    private document: Document;
    private onNuevaPartida: (partida_id: string) => void = () => {};

    setonNuevaPartida(callback: (message: string) => void) {
        this.onNuevaPartida = callback;
    }

    private onClickMapa: (mapa: divMapa) => void = () => {};

    setonClickMapa(callback: (mapa: divMapa) => void) {
        this.onClickMapa = callback;
    }

    DOMIniciado(document: Document, mapas: divMapa[]) {
        this.document = document;
        this.CargarMapas(document, mapas);
        const btnUnirsePartida = document.getElementById('btnUnirse_Partida') as HTMLButtonElement;
        const inputPartidaId = document.getElementById('partida_id') as HTMLInputElement;

        if (btnUnirsePartida && inputPartidaId) {
            btnUnirsePartida.addEventListener('click', () => {
            const partidaId = inputPartidaId.value;
            console.log('Número de partida:', partidaId);
            if (this.onNuevaPartida) {
                this.onNuevaPartida(partidaId);
            }



            });
        }
    }


    CargarMapas(document: Document, mapas: divMapa[]) {
        const divMapas = document.getElementById('mapas') as HTMLDivElement;
        if (divMapas) {
            mapas.forEach((mapa) => {
                const divMapa = document.createElement('div');
                divMapa.id = mapa.id;
                divMapa.className = 'divMapa';
                divMapa.innerHTML = `<img src="${mapa.src}" alt="${mapa.description}"><p>${mapa.description}</p>`;
                divMapa.addEventListener('click', () => {
                    if (this.onClickMapa) {
                        this.onClickMapa(mapa);
                    }
                });
                divMapas.appendChild(divMapa);
            });
        }
    }


    public mostrar_pagina(pagina: string) {
        const paginas = this.document.getElementsByClassName('pagina') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < paginas.length; i++) {
            paginas[i].style.display = 'none';
        }
        const paginaMostrar = this.document.getElementById(pagina);
        if (paginaMostrar) {
            paginaMostrar.style.display = 'block';
        }
    }
}
