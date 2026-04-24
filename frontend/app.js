function loadTechStack() {
    const container = document.getElementById('tech-stack-container');
    if (typeof techStackData !== 'undefined' && techStackData.length > 0) {
        container.innerHTML = techStackData.map(tech => `
            <div class="tech-card">
                <h3>${tech.name}</h3>
                <div class="category">${tech.category}</div>
                <p>${tech.description}</p>
            </div>
        `).join('');
    } else {
        container.innerHTML = '<p class="loading">Tech Stack konnte nicht geladen werden.</p>';
    }
}

function loadProjects() {
    const container = document.getElementById('projects-container');
    if (typeof projectsData !== 'undefined' && projectsData.length > 0) {
        container.innerHTML = projectsData.map(project => `
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
}

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

document.addEventListener('DOMContentLoaded', () => {
    loadTechStack();
    loadProjects();
});