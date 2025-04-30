<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "study_crystal_db");

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Consulta para obtener los productos
$sql = "SELECT nombre, precio, imagen, stock FROM productos";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
    exit();
}

$productos = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Si las rutas de las imágenes son absolutas, conviértelas en relativas
        if (strpos($row['imagen'], "C:\\xampp\\htdocs\\aplicacion_web\\") !== false) {
            $row['imagen'] = str_replace("C:\\xampp\\htdocs\\aplicacion_web\\", "", $row['imagen']);
        }
        $productos[] = $row;
    }
}

// Cerrar conexión
$conn->close();

// Devolver los datos en formato JSON
echo json_encode($productos);
?>