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

$pathInfo = $_SERVER['PATH_INFO'] ?? '';
$department = trim($pathInfo, '/');

if (empty($department)) {
    http_response_code(400);
    echo json_encode(['error' => 'Department parameter is required']);
    exit();
}

// Role-based access control
if ($payload['role'] === 'dean' && $payload['department'] !== $department) {
    http_response_code(403);
    echo json_encode(['error' => 'Access denied to this department']);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();

    // Get department overview
    $overviewQuery = "SELECT 
        COUNT(*) as total_alumni,
        SUM(CASE WHEN is_in_field = 1 AND employment_status = 'employed' THEN 1 ELSE 0 END) as in_field_count,
        SUM(CASE WHEN employment_status = 'employed' THEN 1 ELSE 0 END) as employed_count,
        AVG(CASE WHEN salary IS NOT NULL AND salary > 0 THEN salary ELSE NULL END) as avg_salary
        FROM alumni WHERE department = ?";
    
    $overviewStmt = $db->prepare($overviewQuery);
    $overviewStmt->execute([$department]);
    $overview = $overviewStmt->fetch();

    $totalAlumni = (int)$overview['total_alumni'];
    $inFieldRate = $totalAlumni > 0 ? ($overview['in_field_count'] / $totalAlumni) * 100 : 0;
    $employmentRate = $totalAlumni > 0 ? ($overview['employed_count'] / $totalAlumni) * 100 : 0;

    // Get top job titles
    $jobTitlesQuery = "SELECT 
        current_position as title,
        COUNT(*) as count,
        (COUNT(*) * 100.0 / ?) as percentage
        FROM alumni 
        WHERE department = ? AND current_position IS NOT NULL AND current_position != ''
        GROUP BY current_position 
        ORDER BY count DESC 
        LIMIT 10";
    
    $jobTitlesStmt = $db->prepare($jobTitlesQuery);
    $jobTitlesStmt->execute([$totalAlumni, $department]);
    $topJobTitles = $jobTitlesStmt->fetchAll();

    // Get top companies
    $companiesQuery = "SELECT 
        company as name,
        COUNT(*) as employee_count
        FROM alumni 
        WHERE department = ? AND company IS NOT NULL AND company != ''
        GROUP BY company 
        ORDER BY employee_count DESC 
        LIMIT 10";
    
    $companiesStmt = $db->prepare($companiesQuery);
    $companiesStmt->execute([$department]);
    $topCompanies = $companiesStmt->fetchAll();

    // Get graduation year trends
    $trendsQuery = "SELECT 
        graduation_year as year,
        COUNT(*) as count,
        (SUM(CASE WHEN is_in_field = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as in_field_rate
        FROM alumni 
        WHERE department = ?
        GROUP BY graduation_year 
        ORDER BY graduation_year DESC 
        LIMIT 5";
    
    $trendsStmt = $db->prepare($trendsQuery);
    $trendsStmt->execute([$department]);
    $graduationTrends = $trendsStmt->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => [
            'department' => $department,
            'total_alumni' => $totalAlumni,
            'in_field_rate' => round($inFieldRate, 1),
            'avg_salary' => '$' . number_format($overview['avg_salary'] ?? 0, 0),
            'employment_rate' => round($employmentRate, 1),
            'top_job_titles' => array_map(function($job) {
                return [
                    'title' => $job['title'],
                    'count' => (int)$job['count'],
                    'percentage' => round($job['percentage'], 1)
                ];
            }, $topJobTitles),
            'top_companies' => array_map(function($company) {
                return [
                    'name' => $company['name'],
                    'employee_count' => (int)$company['employee_count']
                ];
            }, $topCompanies),
            'graduation_year_trends' => array_map(function($trend) {
                return [
                    'year' => (int)$trend['year'],
                    'count' => (int)$trend['count'],
                    'in_field_rate' => round($trend['in_field_rate'], 1)
                ];
            }, $graduationTrends),
            'trends' => [
                'in_field_growth' => rand(5, 15), // Mock data - implement proper calculation
                'salary_growth' => rand(3, 12),
                'employment_growth' => rand(2, 8)
            ]
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>