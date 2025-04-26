// Basic form validation
document.getElementById('createUserForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Reset error message
    errorMessage.textContent = '';
    
    // Simple validation
    if (username.length < 3) {
        errorMessage.textContent = 'El nombre de usuario debe tener al menos 3 caracteres';
        event.preventDefault();
        return;
    }
    
    if (password.length < 6) {
        errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
        event.preventDefault();
        return;
    }
    
    // Form is valid, it will be submitted normally
});