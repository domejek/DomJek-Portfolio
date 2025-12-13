<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$techStack = [
    [
        'name' => 'JavaScript',
        'category' => 'Frontend',
        'description' => 'Moderne ES6+ Entwicklung mit React, Vue und Vanilla JS für interaktive Benutzeroberflächen.'
    ],
    [
        'name' => 'PHP',
        'category' => 'Backend',
        'description' => 'Server-seitige Entwicklung mit PHP 8+, RESTful APIs und Datenbankintegration.'
    ],
    [
        'name' => 'Docker',
        'category' => 'DevOps',
        'description' => 'Containerisierung von Anwendungen für konsistente Entwicklungs- und Produktionsumgebungen.'
    ],
    [
        'name' => 'Kubernetes',
        'category' => 'DevOps',
        'description' => 'Orchestrierung von containerisierten Anwendungen mit automatischer Skalierung und Load Balancing.'
    ],
    [
        'name' => 'Git & GitHub',
        'category' => 'Tools',
        'description' => 'Versionskontrolle, CI/CD mit GitHub Actions und kollaborative Softwareentwicklung.'
    ],
    [
        'name' => 'MySQL',
        'category' => 'Database',
        'description' => 'Relationale Datenbanken für strukturierte Datenspeicherung und komplexe Abfragen.'
    ]
];

echo json_encode([
    'success' => true,
    'techStack' => $techStack,
    'count' => count($techStack)
]);
?>