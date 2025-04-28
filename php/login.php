<?php
// filepath: c:\xampp\htdocs\aplicacion_web\php\login.php

// Conexión a la base de datos
$servername = "localhost:8080";
$username = "root";
$password = "";
$dbname = "study_crystal_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]));
}

// Obtener datos del formulario
$user = $_POST['username'];
$pass = $_POST['password'];

// Verificar usuario en la base de datos
$sql = "SELECT * FROM usuario WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($pass, $row['password'])) {
        // Inicio de sesión exitoso
        echo json_encode([
            "success" => true,
            "username" => $row['username']
        ]);
    } else {
        // Contraseña incorrecta
        echo json_encode([
            "success" => false,
            "message" => "Contraseña incorrecta"
        ]);
    }
} else {
    // Usuario no encontrado
    echo json_encode([
        "success" => false,
        "message" => "Usuario no encontrado"
    ]);
}

$conn->close();
?>