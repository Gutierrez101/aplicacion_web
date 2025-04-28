<?php
// filepath: php/create_user.php

// Conexión a la base de datos
$servername = "localhost:8080";
$username = "root";
$password = "";
$dbname = "study_crystal_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$user = $_POST['username'];
$pass = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encriptar la contraseña

// Insertar datos en la tabla
$sql = "INSERT INTO usuario (username, password) VALUES ('$user', '$pass')";

if ($conn->query($sql) === TRUE) {
    echo "<script>
        alert('Usuario creado exitosamente');
        window.location.href='../formulario-login.html';
    </script>";
} else {
    echo "<script>
        alert('Error: " . $conn->error . "');
        window.history.back();
    </script>";
}

$conn->close();
?>