document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simular una solicitud al servidor para validar el inicio de sesión
    fetch("php/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Guardar el nombre del usuario en LocalStorage
                localStorage.setItem("usuarioLogueado", username);

                // Mostrar un mensaje de éxito
                Swal.fire({
                    icon: "success",
                    title: "Inicio de sesión exitoso",
                    text: `Bienvenido, ${username}!`,
                }).then(() => {
                    // Redirigir al index.html
                    window.location.href = "index.html";
                });
            } else {
                // Mostrar un mensaje de error
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "Usuario o contraseña incorrectos.",
                });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al iniciar sesión.",
            });
        });
});

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado"); // Eliminar el usuario logueado de LocalStorage
    window.location.reload(); // Recargar la página para reflejar el cambio
}