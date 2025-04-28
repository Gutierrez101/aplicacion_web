document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const btnIngresar = document.getElementById("btnIngresar");
    const usuarioLogueadoDiv = document.getElementById("usuarioLogueado");

    if (usuarioLogueado) {
        // Si hay un usuario logueado, mostrar su nombre y ocultar el botón "Ingresar"
        btnIngresar.style.display = "none";
        usuarioLogueadoDiv.style.display = "block";
        usuarioLogueadoDiv.innerHTML = `<p>👤 Bienvenido, ${usuarioLogueado}</p>`;
    }
});
