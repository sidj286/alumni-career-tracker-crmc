<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';
require_once '../utils/jwt.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['username']) || !isset($input['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Username and password are required']);
        exit();
    }

    $database = new Database();
    $db = $database->getConnection();

    // Find user by username
    $query = "SELECT id, username, email, password_hash, role, department, is_active FROM users WHERE username = ? AND is_active = 1";
    $stmt = $db->prepare($query);
    $stmt->execute([$input['username']]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit();
    }

    // For demo purposes, accept any password
    // In production, use: password_verify($input['password'], $user['password_hash'])
    if (true) { // Replace with proper password verification
        // Update last login
        $updateQuery = "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?";
        $updateStmt = $db->prepare($updateQuery);
        $updateStmt->execute([$user['id']]);

        // Generate JWT token
        $token = generateJWT([
            'user_id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role'],
            'department' => $user['department']
        ]);

        // Remove password hash from response
        unset($user['password_hash']);

        echo json_encode([
            'success' => true,
            'token' => $token,
            'user' => $user
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>