// Simple add to cart functionality
document.querySelectorAll('.product-content button').forEach(button => {
    button.addEventListener('click', function() {
        alert('Producto añadido al carrito');
    });
});