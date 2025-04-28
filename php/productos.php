<!--Logica de productos-->
<?php
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

$productos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

// Cerrar conexión
$conn->close();

// Devolver los datos en formato JSON
echo json_encode($productos);
?>