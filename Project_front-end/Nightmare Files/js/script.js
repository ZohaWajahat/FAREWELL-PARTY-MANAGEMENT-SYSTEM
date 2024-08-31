const wrapper = document.querySelector('.wrapper');
function registerActive() {
    wrapper.classList.toggle('active');
}
function loginActive() {
    wrapper.classList.toggle('active');
}
function redirectToMain() {
    window.location.href = 'main.html';
}