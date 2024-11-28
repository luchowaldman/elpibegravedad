
document.addEventListener('DOMContentLoaded', () => {


const usernameInput = document.getElementById('username') as HTMLInputElement;
const serverInput = document.getElementById('server') as HTMLInputElement;
const form = document.querySelector('form');
const musicSelect = document.getElementById('music') as HTMLSelectElement;

if (musicSelect) {
    musicSelect.value = localStorage.getItem('music') || 'si';
}

musicSelect?.addEventListener('change', () => {
    localStorage.setItem('music', musicSelect.value);
});


if (usernameInput && serverInput) {
    usernameInput.value = localStorage.getItem('username') || '';
    serverInput.value = localStorage.getItem('server') || '';
    if (serverInput.value == '') {
        serverInput.value = 'https://elpibegravedad-425557060156.southamerica-east1.run.app';
    }
}

form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (usernameInput && serverInput) {
        localStorage.setItem('username', usernameInput.value);
        localStorage.setItem('server', serverInput.value);
        localStorage.setItem('music', musicSelect.value);
        window.location.href = 'index.html';
    }
});
});
