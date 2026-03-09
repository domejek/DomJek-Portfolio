const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

const loadJson = (filename) => {
    const filePath = path.join(__dirname, 'data', filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Portfolio Backend API is running!',
        version: '2.0.0',
        kubernetes: true,
        timestamp: new Date().toISOString()
    });
});

app.get('/api/projects', (req, res) => {
    const projects = loadJson('projects.json');
    res.json({
        success: true,
        projects: projects,
        count: projects.length
    });
});

app.get('/api/tech-stack', (req, res) => {
    const techStack = loadJson('tech-stack.json');
    res.json({
        success: true,
        techStack: techStack,
        count: techStack.length
    });
});

const frontendPath = path.join(__dirname, '../frontend');
console.log('Serving frontend from:', frontendPath);

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
