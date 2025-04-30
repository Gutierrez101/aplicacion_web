<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"), true);
$usuario = $data['usuario'];
$carrito = $data['carrito'];

$conn = new mysqli("localhost:8080", "root", "", "study_crystal_db");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

foreach ($carrito as $producto) {
    $nombre = $conn->real_escape_string($producto['nombre']);
    $sql = "UPDATE productos SET stock = stock - 1 WHERE nombre = '$nombre' AND stock > 0";
    $conn->query($sql);
}

$conn->close();
echo json_encode(["success" => true]);
?>