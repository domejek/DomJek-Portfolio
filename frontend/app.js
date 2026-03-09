// API Base URL - served by same Node.js backend
const API_URL = '';

// Fetch Tech Stack from Backend
async function loadTechStack() {
    try {
        const response = await fetch(`${API_URL}/api/tech-stack`);
        const data = await response.json();
        
        const container = document.getElementById('tech-stack-container');
        
        if (data.success) {
            container.innerHTML = data.techStack.map(tech => `
                <div class="tech-card">
                    <h3>${tech.name}</h3>
                    <div class="category">${tech.category}</div>
                    <p>${tech.description}</p>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p class="loading">Tech Stack konnte nicht geladen werden.</p>';
        }
    } catch (error) {
        console.error('Error loading tech stack:', error);
        document.getElementById('tech-stack-container').innerHTML = 
            '<p class="loading">Fehler beim Laden des Tech Stacks.</p>';
    }
}

// Fetch Projects from Backend
async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/api/projects`);
        const data = await response.json();
        
        const container = document.getElementById('projects-container');
        
        if (data.success) {
            container.innerHTML = data.projects.map(project => `
                <div class="project-card">
                    <h3>${project.name}</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    <p>${project.description}</p>
                    <a href="${project.github}" target="_blank">Auf GitHub ansehen →</a>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p class="loading">Projekte konnten nicht geladen werden.</p>';
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-container').innerHTML = 
            '<p class="loading">Fehler beim Laden der Projekte.</p>';
    }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    loadTechStack();
    loadProjects();
});