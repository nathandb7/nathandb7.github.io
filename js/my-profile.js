/* cargar una imagen con input y guardar en local stoarage */
let image = document.getElementById('fperfil')
if (localStorage.getItem("image") == null) {
    image.src = 'img/img_perfil.png';
} else {
    image.src = localStorage.getItem('image');
}

let guardar = document.getElementById('guardar')

guardar.addEventListener('click', function () {
    let file = document.getElementById('file').files[0];
    console.log(file)
    if (file == undefined) {
        guardardatos()
    } else {
        let reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem('image', e.target.result);
        };
        reader.readAsDataURL(file);
        guardardatos()
    }
});

/* guardar datos de usuario de input en localstorage */
let pnombre = document.getElementById('pnombre');
let snombre = document.getElementById('snombre');
let papellido = document.getElementById('papellido');
let sapellido = document.getElementById('sapellido');
let telefono = document.getElementById('telefono');
function guardardatos() {
    let userData = {
        pnombre: pnombre.value,
        snombre: snombre.value,
        papellido: papellido.value,
        sapellido: sapellido.value,
        telefono: telefono.value
    };
    localStorage.setItem('userData', JSON.stringify(userData));
}
/* llamar datos */
if (localStorage.getItem("userData") == null) {
    emailInput.setAttribute('value', email);
} else {
    emailInput.setAttribute('value', email);
    userData2 = JSON.parse(localStorage.getItem('userData'));
    pnombre.setAttribute('value', userData2.pnombre);
    snombre.setAttribute('value', userData2.snombre);
    papellido.setAttribute('value', userData2.papellido);
    sapellido.setAttribute('value', userData2.sapellido);
    telefono.setAttribute('value', userData2.telefono);
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()