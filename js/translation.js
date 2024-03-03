document.addEventListener('DOMContentLoaded', function () {
    // Guarda el HTML original al cargar la página
    let originalHTML;

    // Función para restablecer al estado original
    function resetToOriginal() {
        document.removeEventListener('change', changeLanguage);
        document.documentElement.innerHTML = originalHTML;
        document.getElementById('language').addEventListener('change', changeLanguage);
    }

    // Lógica para cambiar los textos y contenido según el idioma seleccionado
    function changeLanguage() {
        let selectedLanguage = document.getElementById('language').value;

        if (selectedLanguage === 'es') {
            // Si es español, restablece al estado original
            resetToOriginal();
        } else if (selectedLanguage === 'en') {
            // Guarda el HTML original si aún no se ha guardado
            if (!originalHTML) {
                originalHTML = document.documentElement.innerHTML;
            }

            // Cambiar textos al inglés
            document.querySelector('.a1').textContent = 'About Me';
            document.querySelector('.a2').textContent = 'Projects';
            document.querySelector('.a3').textContent = 'Education';
            document.querySelector('.a4').textContent = 'Contact';

            document.querySelector('.about-title').textContent = 'About Me';
            document.querySelector('.about-description').textContent = 'I am a passionate Web Developer with outstanding skills in HTML, CSS, JavaScript, React and PHP. My main focus is on creating captivating and functional user experiences. I have contributed to the success of projects through engaging frontend design and efficient backend implementation using PHP and MySQL. ';
            document.querySelector('.about-description-2').textContent = 'With a proactive attitude and a constant commitment to continuous improvement, I am ready to face challenges and provide innovative solutions. My ability to adapt to new technologies and my focus on keeping up to date with the latest trends position me as a versatile and results-oriented professional.';
            document.querySelector('.projects-title').textContent = 'Featured Projects';

            let [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10] = document.querySelectorAll('.project p');
            p1.textContent = 'Project with HTML, JS, Node, Express and mongoDB';
            p2.textContent = 'Project with HTML, CSS, JS, Bootstrap';
            p3.textContent = 'Project with React, Vite, Tailwind CSS, LocalStorage';
            p4.textContent = 'Project with React, Vite, Styled Components, Custom Hooks';
            p5.textContent = 'Project with HTML, SASS and Gulp';
            p6.textContent = 'Project with React, Vite, LocalStorage';
            p7.textContent = 'Real estate site HTML, SASS, Gulp, PHP, MySql';
            p8.textContent = 'Project with HTML, CSS';
            p9.textContent = 'Wordpress project';
            p10.textContent = 'Wordpress project';

            // Selecciona los elementos h3 dentro de la clase .project
            let [h3_1, h3_2, h3_3, h3_4, h3_5, h3_6, h3_7, h3_8, h3_9, h3_10] = document.querySelectorAll('.project h3');

            // Establece el contenido de los elementos h3 a una cadena vacía
            h3_1.textContent = 'App - Live Chat JavaScript';
            h3_2.textContent = 'Website - emercado ceibal';
            h3_3.textContent = 'App - Veterinary Patient Monitoring';
            h3_4.textContent = 'App - Cryptocurrency Quote';
            h3_5.textContent = 'Web - Event promotion';
            h3_6.textContent = 'App - Expense Control';
            h3_7.textContent = 'Website - Real Estate';
            h3_8.textContent = 'Website - Frond End Store';
            h3_9.textContent = 'Website - Nimbus';
            h3_10.textContent = 'Website - Neozix';

            // Selecciona los enlaces dentro de la clase .project
            let enlacesCodigo = document.querySelectorAll('.project a');

            // Traduce el texto de los enlaces
            enlacesCodigo.forEach(enlace => {
                if (enlace.textContent === 'Ver Codigo') {
                    enlace.textContent = 'View Code';
                } else if (enlace.textContent === 'Ver Proyecto') {
                    enlace.textContent = 'View Project';
                }
            });


            document.querySelector('.educacion h2').textContent = 'Education'
            document.querySelector('.contact h2').textContent = 'Contact'

            document.querySelector('footer p').textContent = '© 2024 Nathan de Barros. All rights reserved.'
        }
    }

    // Agrega un evento al cambio de idioma
    document.getElementById('language').addEventListener('change', changeLanguage);
});
