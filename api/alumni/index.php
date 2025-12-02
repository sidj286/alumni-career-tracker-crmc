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

try {
    $database = new Database();
    $db = $database->getConnection();

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            handleGetAlumni($db);
            break;
        case 'POST':
            handleCreateAlumni($db);
            break;
        case 'PUT':
            handleUpdateAlumni($db);
            break;
        case 'DELETE':
            handleDeleteAlumni($db);
            break;
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error: ' . $e->getMessage()]);
}

function handleGetAlumni($db) {
    $where = [];
    $params = [];

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

function handleCreateAlumni($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $required = ['name', 'email', 'department', 'graduation_year'];
    foreach ($required as $field) {
        if (!isset($input[$field]) || empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "Field '$field' is required"]);
            return;
        }
    }

    $query = "INSERT INTO alumni (name, email, department, graduation_year, degree_type, current_position, company, is_in_field, location, employment_status, linkedin_url, phone, notes) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $db->prepare($query);
    $result = $stmt->execute([
        $input['name'],
        $input['email'],
        $input['department'],
        $input['graduation_year'],
        $input['degree_type'] ?? 'Bachelor',
        $input['current_position'] ?? null,
        $input['company'] ?? null,
        isset($input['is_in_field']) ? ($input['is_in_field'] ? 1 : 0) : 1,
        $input['location'] ?? null,
        $input['employment_status'] ?? 'employed',
        $input['linkedin_url'] ?? null,
        $input['phone'] ?? null,
        $input['notes'] ?? null
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
        echo json_encode(['success' => false, 'error' => 'Failed to create alumni record']);
    }
}

function handleUpdateAlumni($db) {
    // Implementation for updating alumni records
    echo json_encode(['success' => true, 'message' => 'Update functionality not implemented yet']);
}

function handleDeleteAlumni($db) {
    // Implementation for deleting alumni records
    echo json_encode(['success' => true, 'message' => 'Delete functionality not implemented yet']);
}
?>