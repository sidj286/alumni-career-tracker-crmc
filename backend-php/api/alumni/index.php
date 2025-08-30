<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';
require_once '../utils/jwt.php';

// Verify JWT token
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

$token = substr($authHeader, 7);
$payload = verifyJWT($token);

if (!$payload) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid token']);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            handleGetAlumni($db, $payload);
            break;
        case 'POST':
            handleCreateAlumni($db, $payload);
            break;
        case 'PUT':
            handleUpdateAlumni($db, $payload);
            break;
        case 'DELETE':
            handleDeleteAlumni($db, $payload);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

function handleGetAlumni($db, $payload) {
    $where = [];
    $params = [];

    // Role-based access control
    if ($payload['role'] === 'faculty') {
        $where[] = "department = ?";
        $params[] = $payload['department'];
    }

    // Apply filters
    if (isset($_GET['department']) && $_GET['department'] !== 'all') {
        $where[] = "department = ?";
        $params[] = $_GET['department'];
    }

    if (isset($_GET['graduation_year']) && $_GET['graduation_year'] !== 'all') {
        $where[] = "graduation_year = ?";
        $params[] = $_GET['graduation_year'];
    }

    if (isset($_GET['search']) && !empty($_GET['search'])) {
        $where[] = "(name LIKE ? OR email LIKE ? OR current_position LIKE ? OR company LIKE ?)";
        $searchTerm = '%' . $_GET['search'] . '%';
        $params = array_merge($params, [$searchTerm, $searchTerm, $searchTerm, $searchTerm]);
    }

    if (isset($_GET['is_in_field'])) {
        $where[] = "is_in_field = ?";
        $params[] = $_GET['is_in_field'] === 'true' ? 1 : 0;
    }

    // Pagination
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $offset = ($page - 1) * $limit;

    // Build query
    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';
    
    $query = "SELECT * FROM alumni $whereClause ORDER BY updated_at DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;

    $stmt = $db->prepare($query);
    $stmt->execute($params);
    $alumni = $stmt->fetchAll();

    // Get total count
    $countQuery = "SELECT COUNT(*) as total FROM alumni $whereClause";
    $countStmt = $db->prepare($countQuery);
    $countStmt->execute(array_slice($params, 0, -2)); // Remove limit and offset
    $total = $countStmt->fetch()['total'];

    echo json_encode([
        'success' => true,
        'data' => $alumni,
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => (int)$total,
            'pages' => ceil($total / $limit)
        ]
    ]);
}

function handleCreateAlumni($db, $payload) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $required = ['name', 'email', 'department', 'graduation_year'];
    foreach ($required as $field) {
        if (!isset($input[$field]) || empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Field '$field' is required"]);
            return;
        }
    }

    $query = "INSERT INTO alumni (name, email, student_id, department, graduation_year, degree_type, current_position, company, is_in_field, salary, location, employment_status, linkedin_url, phone, notes, created_by) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $db->prepare($query);
    $result = $stmt->execute([
        $input['name'],
        $input['email'],
        $input['student_id'] ?? null,
        $input['department'],
        $input['graduation_year'],
        $input['degree_type'] ?? 'Bachelor',
        $input['current_position'] ?? null,
        $input['company'] ?? null,
        isset($input['is_in_field']) ? ($input['is_in_field'] ? 1 : 0) : 1,
        $input['salary'] ?? null,
        $input['location'] ?? null,
        $input['employment_status'] ?? 'employed',
        $input['linkedin_url'] ?? null,
        $input['phone'] ?? null,
        $input['notes'] ?? null,
        $payload['user_id']
    ]);

    if ($result) {
        $alumniId = $db->lastInsertId();
        echo json_encode([
            'success' => true,
            'message' => 'Alumni record created successfully',
            'id' => $alumniId
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create alumni record']);
    }
}

function handleUpdateAlumni($db, $payload) {
    $pathInfo = $_SERVER['PATH_INFO'] ?? '';
    $alumniId = (int)trim($pathInfo, '/');
    
    if (!$alumniId) {
        http_response_code(400);
        echo json_encode(['error' => 'Alumni ID is required']);
        return;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    
    // Build dynamic update query
    $fields = [];
    $params = [];
    
    $allowedFields = ['name', 'email', 'student_id', 'department', 'graduation_year', 'degree_type', 
                     'current_position', 'company', 'is_in_field', 'salary', 'location', 
                     'employment_status', 'linkedin_url', 'phone', 'notes'];
    
    foreach ($allowedFields as $field) {
        if (isset($input[$field])) {
            $fields[] = "$field = ?";
            $params[] = $field === 'is_in_field' ? ($input[$field] ? 1 : 0) : $input[$field];
        }
    }
    
    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(['error' => 'No valid fields to update']);
        return;
    }
    
    $params[] = $alumniId;
    
    $query = "UPDATE alumni SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $db->prepare($query);
    $result = $stmt->execute($params);

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Alumni record updated successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update alumni record']);
    }
}

function handleDeleteAlumni($db, $payload) {
    // Only admins can delete
    if ($payload['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(['error' => 'Insufficient privileges']);
        return;
    }

    $pathInfo = $_SERVER['PATH_INFO'] ?? '';
    $alumniId = (int)trim($pathInfo, '/');
    
    if (!$alumniId) {
        http_response_code(400);
        echo json_encode(['error' => 'Alumni ID is required']);
        return;
    }

    $query = "DELETE FROM alumni WHERE id = ?";
    $stmt = $db->prepare($query);
    $result = $stmt->execute([$alumniId]);

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Alumni record deleted successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete alumni record']);
    }
}
?>