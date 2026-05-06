function loadTechStack() {
    const container = document.getElementById('tech-stack-container');
    if (typeof techStackData !== 'undefined' && techStackData.length > 0) {
        container.innerHTML = techStackData.map(tech => {
            const skillDots = [1, 2, 3, 4, 5].map(i => 
                `<div class="skill-dot ${i <= tech.level ? 'active' : ''}"></div>`
            ).join('');
            
            return `
                <div class="tech-card animate-on-scroll">
                    <div class="tech-card-header">
                        <div class="tech-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                        </div>
                        <div>
                            <h3>${tech.name}</h3>
                            <div class="category">${tech.category}</div>
                        </div>
                    </div>
                    <p>${tech.description}</p>
                    <div class="skill-level">${skillDots}</div>
                </div>
            `;
        }).join('');
    } else {
        container.innerHTML = '<p class="loading">Tech Stack konnte nicht geladen werden.</p>';
    }
}

function loadProjects() {
    const container = document.getElementById('projects-container');
    if (typeof projectsData !== 'undefined' && projectsData.length > 0) {
        container.innerHTML = projectsData.map(project => `
            <div class="project-card animate-on-scroll">
                <div class="project-card-header">
                    <div class="project-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0 3 6 2 0 4-1.5 4-4 0 2-3 4.5-4 5.5 4.5 1.5 6 4.5 4.5 6V22"/></svg>
                    </div>
                    <h3>${project.name}</h3>
                </div>
                <div class="project-card-body">
                    <p>${project.description}</p>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="project-card-footer">
                    <a href="${project.github}" target="_blank">
                        Auf GitHub ansehen
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = '<p class="loading">Projekte konnten nicht geladen werden.</p>';
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
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
    initScrollAnimations();
});
