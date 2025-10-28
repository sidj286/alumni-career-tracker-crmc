<?php
// Simple test file to check if PHP and database are working
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'success',
    'message' => 'PHP is working!',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion()
]);
?>