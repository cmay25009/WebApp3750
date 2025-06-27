document.addEventListener('DOMContentLoaded', () => {
fetch('/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav').innerHTML = data;
    });
});