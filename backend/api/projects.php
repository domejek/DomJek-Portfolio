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

$projects = [
    [
        'name' => 'Kubernetes Portfolio',
        'description' => 'Diese Portfolio-Webseite läuft auf einem Kubernetes-Cluster mit Frontend und Backend Microservices. Demonstriert Container-Orchestrierung und moderne DevOps-Praktiken.',
        'technologies' => ['JavaScript', 'PHP', 'Docker', 'Kubernetes', 'Nginx'],
        'github' => 'https://github.com/dein-username/portfolio-k8s'
    ],
    [
        'name' => 'Task Management API',
        'description' => 'RESTful API für Task-Management mit JWT-Authentifizierung, CRUD-Operationen und MySQL-Datenbank. Vollständig dokumentiert mit Swagger.',
        'technologies' => ['PHP', 'MySQL', 'REST API', 'JWT'],
        'github' => 'https://github.com/dein-username/task-api'
    ],
    [
        'name' => 'Weather Dashboard',
        'description' => 'Interaktives Wetter-Dashboard mit Echtzeit-Daten von OpenWeather API. Zeigt aktuelle Wetterbedingungen und 5-Tage-Vorhersagen.',
        'technologies' => ['JavaScript', 'HTML5', 'CSS3', 'API Integration'],
        'github' => 'https://github.com/dein-username/weather-dashboard'
    ],
    [
        'name' => 'Docker Multi-Container App',
        'description' => 'Full-Stack Anwendung mit Docker Compose orchestriert: React Frontend, Node.js Backend, PostgreSQL Datenbank und Redis Cache.',
        'technologies' => ['Docker', 'React', 'Node.js', 'PostgreSQL', 'Redis'],
        'github' => 'https://github.com/dein-username/docker-fullstack'
    ]
];

echo json_encode([
    'success' => true,
    'projects' => $projects,
    'count' => count($projects)
]);
?>