const email = document.getElementById('email');
const password = document.getElementById('password');
const button = document.getElementById('button');

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
        alert("Bienvenido");
        window.location='index.html';
    }
    else {
        alert("Ingrese los datos correctos")
    }
});
