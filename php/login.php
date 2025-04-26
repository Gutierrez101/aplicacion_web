<?php
// filepath: php/login.php

// Conexión a la base de datos
$servername = "localhost";
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
$pass = $_POST['password'];

// Verificar usuario en la base de datos
$sql = "SELECT * FROM usuario WHERE username = '$user'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($pass, $row['password'])) {
        echo "<script>
            alert('Inicio de sesión exitoso');
            window.location.href='../index.html';
        </script>";
    } else {
        echo "<script>
            alert('Contraseña incorrecta');
            window.history.back();
        </script>";
    }
} else {
    echo "<script>
        alert('Usuario no encontrado');
        window.history.back();
    </script>";
}

$conn->close();
?>