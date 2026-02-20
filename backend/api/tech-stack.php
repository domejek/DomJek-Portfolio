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
        'name' => 'PHP & Laravel',
        'category' => 'Backend',
        'description' => 'Server-seitige Entwicklung mit PHP 8+, Laravel Framework und RESTful APIs.'
    ],
    [
        'name' => 'Java & Quarkus',
        'category' => 'Backend',
        'description' => 'Cloud-Native Java-Anwendungen mit Quarkus für schnelle Startup-Zeiten und geringen Speicherverbrauch.'
    ],
    [
        'name' => 'Python',
        'category' => 'Backend',
        'description' => 'Scripting, Automatisierung und Datenverarbeitung für DevOps-Workflows.'
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
        'name' => 'Grafana & Prometheus',
        'category' => 'Monitoring',
        'description' => 'Monitoring und Visualisierung von Metriken. Dashboards für System- und Anwendungsüberwachung.'
    ],
    [
        'name' => 'InfluxDB',
        'category' => 'Database',
        'description' => 'Time-Series Datenbank für Zeitreihendaten und Monitoring-Metriken.'
    ],
    [
        'name' => 'Git & GitHub',
        'category' => 'Tools',
        'description' => 'Versionskontrolle, CI/CD mit GitHub Actions und kollaborative Softwareentwicklung.'
    ]
];

echo json_encode([
    'success' => true,
    'techStack' => $techStack,
    'count' => count($techStack)
]);
?>