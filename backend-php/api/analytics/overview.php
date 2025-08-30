<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
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

    // Get total alumni count
    $totalQuery = "SELECT COUNT(*) as total FROM alumni";
    $totalStmt = $db->prepare($totalQuery);
    $totalStmt->execute();
    $totalAlumni = $totalStmt->fetch()['total'];

    // Get in-field employment rate
    $inFieldQuery = "SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_in_field = 1 THEN 1 ELSE 0 END) as in_field_count
        FROM alumni WHERE employment_status = 'employed'";
    $inFieldStmt = $db->prepare($inFieldQuery);
    $inFieldStmt->execute();
    $inFieldData = $inFieldStmt->fetch();
    $inFieldRate = $inFieldData['total'] > 0 ? ($inFieldData['in_field_count'] / $inFieldData['total']) * 100 : 0;

    // Get overall employment rate
    $employmentQuery = "SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN employment_status = 'employed' THEN 1 ELSE 0 END) as employed_count
        FROM alumni";
    $employmentStmt = $db->prepare($employmentQuery);
    $employmentStmt->execute();
    $employmentData = $employmentStmt->fetch();
    $employmentRate = $employmentData['total'] > 0 ? ($employmentData['employed_count'] / $employmentData['total']) * 100 : 0;

    // Get recent graduates (last 2 years)
    $currentYear = date('Y');
    $recentQuery = "SELECT COUNT(*) as recent_count FROM alumni WHERE graduation_year >= ?";
    $recentStmt = $db->prepare($recentQuery);
    $recentStmt->execute([$currentYear - 1]);
    $recentGraduates = $recentStmt->fetch()['recent_count'];

    // Get department comparison
    $deptQuery = "SELECT 
        department,
        COUNT(*) as total_count,
        SUM(CASE WHEN is_in_field = 1 AND employment_status = 'employed' THEN 1 ELSE 0 END) as in_field_count,
        AVG(CASE WHEN salary IS NOT NULL THEN salary ELSE 0 END) as avg_salary
        FROM alumni 
        GROUP BY department
        ORDER BY total_count DESC";
    $deptStmt = $db->prepare($deptQuery);
    $deptStmt->execute();
    $departments = $deptStmt->fetchAll();

    $departmentComparison = array_map(function($dept) {
        $inFieldRate = $dept['total_count'] > 0 ? ($dept['in_field_count'] / $dept['total_count']) * 100 : 0;
        return [
            'department' => $dept['department'],
            'in_field_rate' => round($inFieldRate, 1),
            'total_count' => (int)$dept['total_count'],
            'avg_salary' => round($dept['avg_salary'], 0),
            'growth_rate' => rand(5, 15) // Mock growth rate - implement proper calculation
        ];
    }, $departments);

    echo json_encode([
        'success' => true,
        'data' => [
            'total_alumni' => (int)$totalAlumni,
            'overall_in_field_rate' => round($inFieldRate, 1),
            'overall_employment_rate' => round($employmentRate, 1),
            'avg_time_to_employment' => 3.2, // Mock data - implement proper calculation
            'recent_graduates_count' => (int)$recentGraduates,
            'department_comparison' => $departmentComparison
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>