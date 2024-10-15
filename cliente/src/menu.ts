import { Aplicacion } from './aplicacion';

const aplicacion = new Aplicacion();
aplicacion.iniciar();
document.addEventListener('DOMContentLoaded', () => {

    aplicacion.DOMIniciado(document);

});
