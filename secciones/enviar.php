<?php
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];
$producto = $_POST['producto'];
$cantidad = $_POST['cantidad'];
$mensaje = $_POST['mensaje'];

$texto = " *Nuevo pedido Jafra*%0A"
       . "*Nombre:* $nombre%0A"
       . "*Telefono:* $telefono%0A"
       . "*Correo:* $correo%0A"
       . "*Producto:* $producto%0A"
       . "*Cantidad:* $cantidad%0A"
       . "*Mensaje:* $mensaje";

$numero = "522751203903"; 
header("Location: https://wa.me/$numero?text=$texto");
exit;
?>
