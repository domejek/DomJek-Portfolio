<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

echo json_encode([
    'success' => true,
    'message' => 'Portfolio Backend API is running!',
    'version' => '1.0.0',
    'kubernetes' => true,
    'timestamp' => date('Y-m-d H:i:s'),
    'endpoints' => [
        '/index.php' => 'API status',
        '/api/tech-stack.php' => 'Get tech stack',
        '/api/projects.php' => 'Get projects'
    ]
]);
?>