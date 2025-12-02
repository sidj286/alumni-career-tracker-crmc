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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required = ['username', 'email', 'password', 'fullName', 'role'];
    foreach ($required as $field) {
        if (!isset($input[$field]) || empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "Field '$field' is required"]);
            exit();
        }
    }

    // Validate role
    if (!in_array($input['role'], ['admin', 'dean', 'alumni'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid role specified']);
        exit();
    }

    // Validate department for dean/alumni role
    if (($input['role'] === 'dean' || $input['role'] === 'alumni') && empty($input['department'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Department is required for ' . $input['role'] . ' role']);
        exit();
    }

    $database = new Database();
    $db = $database->getConnection();

    // Check if username already exists
    $checkQuery = "SELECT id FROM users WHERE username = ? OR email = ?";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->execute([$input['username'], $input['email']]);
    
    if ($checkStmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => 'Username or email already exists']);
        exit();
    }

    // Hash password
    $passwordHash = password_hash($input['password'], PASSWORD_DEFAULT);

    // Insert new user
    $insertQuery = "INSERT INTO users (username, email, password_hash, role, department, is_active) VALUES (?, ?, ?, ?, ?, ?)";
    $insertStmt = $db->prepare($insertQuery);
    
    $department = ($input['role'] === 'dean' || $input['role'] === 'alumni') ? $input['department'] : null;
    $isActive = true; // Auto-activate for demo
    
    $result = $insertStmt->execute([
        $input['username'],
        $input['email'],
        $passwordHash,
        $input['role'],
        $department,
        $isActive
    ]);

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Account created successfully',
            'data' => [
                'username' => $input['username'],
                'email' => $input['email'],
                'role' => $input['role'],
                'department' => $department
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to create account']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error: ' . $e->getMessage()]);
}
?>