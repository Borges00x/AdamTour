document.addEventListener("DOMContentLoaded", function() {
    const formularios = document.querySelectorAll(".oferta");
    const buscarButton = document.querySelector('.buscar');

    formularios.forEach(function(formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault();
            window.location.href = "/cadastro";
        });
    });
   
});


