const email = document.getElementById('email');
const password = document.getElementById('password');
const button = document.getElementById('button');
const mensajee = document.getElementById('mensajee');
const mensajep = document.getElementById('mensajep');

button.addEventListener('click', (e) => {
    e.preventDefault()
    const em = "e@mail.com";
    const pa = 12345;
    const data = {
        email: email.value,
        password: password.value,
    }
    if (data.email == em && data.password == pa) {
        localStorage.setItem("email", email);
        window.location='index.html';
    }
    else {
        email.className += ' is-invalid'
        password.className += ' is-invalid'
        mensajee.innerHTML = '<p class="text-danger">Email inválido</p> '
        mensajep.innerHTML = '<p class="text-danger">Contraseña invalida</p>'
    }
});
