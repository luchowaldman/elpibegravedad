
document.addEventListener('DOMContentLoaded', () => {


const usernameInput = document.getElementById('username') as HTMLInputElement;
const serverInput = document.getElementById('server') as HTMLInputElement;
const form = document.querySelector('form');

if (usernameInput && serverInput) {
    usernameInput.value = localStorage.getItem('username') || '';
    serverInput.value = localStorage.getItem('server') || '';
    if (serverInput.value == '') {
        serverInput.value = 'http://localhost:8080';
    }
}

form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (usernameInput && serverInput) {
        localStorage.setItem('username', usernameInput.value);
        localStorage.setItem('server', serverInput.value);
        window.location.href = 'index.html';
    }
});
});
