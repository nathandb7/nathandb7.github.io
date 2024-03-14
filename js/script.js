document.addEventListener('DOMContentLoaded', function () {
    let menuIcon = document.querySelector('.menu-icon');
    let nav = document.querySelector('.mobile-menu nav');

    menuIcon.addEventListener('click', function () {
        if (nav.style.display === 'block') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'block';
        }
    });

    // Agrega un controlador de eventos de redimensionamiento de ventana
    window.addEventListener('resize', function () {
        if (window.innerWidth > 800) {
            nav.style.display = 'none';
        }
    });
});
