document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const carritoContainer = document.querySelector(".contenedor");
    const totalElement = document.getElementById("total");
    const usuarioLogueadoDiv = document.getElementById("usuarioLogueado");
    const usuarioNombre = document.getElementById("usuarioNombre");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    const btnIngresar = document.getElementById("btnIngresar");

    // Controlar la visibilidad de los botones
    if (usuarioLogueado) {
        usuarioLogueadoDiv.style.display = "block";
        usuarioNombre.textContent = `👤 Bienvenido, ${usuarioLogueado}`;
        if (btnIngresar) btnIngresar.style.display = "none";
    } else {
        usuarioLogueadoDiv.style.display = "none";
        if (btnIngresar) btnIngresar.style.display = "block";
    }

    // Cerrar sesión
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function () {
            if (usuarioLogueado) {
                // Eliminar el carrito del usuario actual
                localStorage.removeItem(`carrito_${usuarioLogueado}`);
            }
            // Eliminar el usuario logueado y redirigir al inicio
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "index.html";
        });
    }

    // Cargar productos del carrito
    cargarCarrito();

    // Vaciar carrito
    const vaciarBtn = document.querySelector(".vaciar-btn");
    if (vaciarBtn) {
        vaciarBtn.addEventListener("click", function () {
            localStorage.removeItem(`carrito_${usuarioLogueado}`);
            cargarCarrito();
        });
    }

    // Finalizar compra
    const finalizarCompraBtn = document.querySelector(".finalizar-compra");
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener("click", finalizarCompra);
    }

    // Función para cargar el carrito
    function cargarCarrito() {
        if (!usuarioLogueado) {
            carritoContainer.innerHTML = "<p>Debes iniciar sesión para ver tu carrito.</p>";
            totalElement.textContent = "$0.00";
            return;
        }

        const carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioLogueado}`)) || [];
        carritoContainer.innerHTML = ""; // Limpiar el contenedor
        let total = 0;

        if (carrito.length === 0) {
            carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
            totalElement.textContent = "$0.00";
            return;
        }

        carrito.forEach((producto, index) => {
            total += parseFloat(producto.precio);

            const itemHTML = `
                <div class="cart-item">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="item-details">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${parseFloat(producto.precio).toFixed(2)}</p>
                    </div>
                    <button class="eliminar-btn" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
            carritoContainer.innerHTML += itemHTML;
        });

        // Actualizar el total
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Función para eliminar un producto del carrito
    window.eliminarDelCarrito = function (index) {
        const carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioLogueado}`)) || [];
        carrito.splice(index, 1);
        localStorage.setItem(`carrito_${usuarioLogueado}`, JSON.stringify(carrito));
        cargarCarrito();
    };

    // Función para finalizar la compra
    function finalizarCompra() {
        const carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioLogueado}`)) || [];

        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        fetch("php/finalizar_compra.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario: usuarioLogueado, carrito }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Compra finalizada con éxito.");
                    localStorage.removeItem(`carrito_${usuarioLogueado}`);
                    cargarCarrito();
                } else {
                    alert(`Error al finalizar la compra: ${data.error}`);
                }
            })
            .catch((error) => {
                console.error("Error al finalizar la compra:", error);
            });
    }
});