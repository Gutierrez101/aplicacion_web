document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const btnIngresar = document.getElementById("btnIngresar");
    const usuarioLogueadoDiv = document.getElementById("usuarioLogueado");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    if (usuarioLogueado) {
        // Si hay un usuario logueado, mostrar su nombre y ocultar el botón "Ingresar"
        if (btnIngresar) btnIngresar.style.display = "none";
        if (usuarioLogueadoDiv) {
            usuarioLogueadoDiv.style.display = "block";
            usuarioLogueadoDiv.innerHTML = `<p>👤 Bienvenido, ${usuarioLogueado}</p>`;
            usuarioLogueadoDiv.appendChild(btnCerrarSesion); // Asegurarse de que el botón esté dentro del contenedor
        }
    }

    // Agregar evento para cerrar sesión
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function () {
            // Eliminar el usuario logueado de LocalStorage
            localStorage.removeItem("usuarioLogueado");

            // Recargar la página para actualizar la interfaz
            window.location.reload();
        });
    }
});