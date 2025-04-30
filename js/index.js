document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const btnIngresar = document.getElementById("btnIngresar");
    const usuarioLogueadoDiv = document.getElementById("usuarioLogueado");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    const productsContainer = document.querySelector(".products-container");

    // Mostrar el usuario logueado
    if (usuarioLogueado) {
        if (btnIngresar) btnIngresar.style.display = "none";
        if (usuarioLogueadoDiv) {
            usuarioLogueadoDiv.style.display = "block";
            usuarioLogueadoDiv.innerHTML = `<p>👤 Bienvenido, ${usuarioLogueado}</p>`;
            usuarioLogueadoDiv.appendChild(btnCerrarSesion);
        }
    }

    // Cerrar sesión
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function () {
            localStorage.removeItem("usuarioLogueado");
            window.location.reload();
        });
    }

    // Cargar productos desde productos.php
    fetch("php/productos.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                productsContainer.innerHTML = `<p>Error: ${data.error}</p>`;
                return;
            }

            let html = "";
            data.forEach((producto) => {
                html += `
                    <div class="product-card">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="product-content">
                            <h4 class="title-product">${producto.nombre}</h4>
                            <p class="precio-product-word">PRECIO</p>
                            <p class="precio-product">$${parseFloat(producto.precio).toFixed(2)}</p>
                            <button onclick='agregarAlCarrito(${JSON.stringify(producto)})' ${producto.stock <= 0 ? "disabled" : ""}>
                                ${producto.stock > 0 ? "🛒 Añadir al carrito" : "Producto sin stock"}
                            </button>
                        </div>
                    </div>
                `;
            });

            productsContainer.innerHTML = html;
        })
        .catch((error) => {
            console.error("Error al cargar los productos:", error);
            productsContainer.innerHTML = `<p>Error al cargar los productos: ${error.message}</p>`;
        });
});

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para añadir productos al carrito.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioLogueado}`)) || [];
    carrito.push(producto);
    localStorage.setItem(`carrito_${usuarioLogueado}`, JSON.stringify(carrito));
    alert("Producto añadido al carrito");
}