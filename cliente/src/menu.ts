import { Aplicacion } from './modelo/Aplicacion/aplicacion';

const username = localStorage.getItem('username') || '';
const serverInput = localStorage.getItem('server') || '';
if (serverInput == '') {
    
    window.location.href = 'config.html';
}
const aplicacion = new Aplicacion(serverInput, username);
aplicacion.iniciar();
document.addEventListener('DOMContentLoaded', () => {

    aplicacion.DOMIniciado(document);

});
