// Mostrar el usuario logueado y manejar el cierre de sesión
document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const btnIngresar = document.getElementById("btnIngresar");
    const usuarioLogueadoDiv = document.getElementById("usuarioLogueado");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    if (usuarioLogueado) {
        // Si hay un usuario logueado, mostrar su nombre y ocultar el botón "Ingresar"
        if (btnIngresar) btnIngresar.style.display = "none";
        if (usuarioLogueadoDiv) {
            usuarioLogueadoDiv.style.display = "flex";
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

// Función para cargar el carrito desde LocalStorage
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoContainer = document.querySelector(".modal .contenedor");

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let html = "";
    carrito.forEach((producto, index) => {
        html += `
            <div class="cart-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="item-details">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${parseFloat(producto.precio).toFixed(2)}</p>
                    <p>Cantidad: 1</p>
                </div>
                <button class="eliminar-btn" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
    });

    carritoContainer.innerHTML = html;
    updateTotal();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

// Función para actualizar el total del carrito
function updateTotal() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((sum, producto) => sum + parseFloat(producto.precio), 0);
    document.getElementById("total").textContent = "$" + total.toFixed(2);
}

// Función para generar el PDF
function generarPDF() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Resumen de Compra", 10, 10);

    let y = 20;
    carrito.forEach((producto, index) => {
        doc.text(`${index + 1}. ${producto.nombre} - $${parseFloat(producto.precio).toFixed(2)}`, 10, y);
        y += 10;
    });

    doc.text(`Total: $${carrito.reduce((total, producto) => total + parseFloat(producto.precio), 0).toFixed(2)}`, 10, y + 10);

    // Descargar el PDF
    doc.save("resumen_compra.pdf");

    // Vaciar el carrito después de finalizar la compra
    localStorage.removeItem("carrito");
    alert("Compra finalizada. El carrito ha sido vaciado.");
    cargarCarrito();
}

// Asignar eventos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    cargarCarrito();

    document.querySelector(".vaciar-btn").addEventListener("click", function () {
        localStorage.removeItem("carrito");
        cargarCarrito();
    });

    document.querySelector(".finalizar-compra").addEventListener("click", generarPDF);
});