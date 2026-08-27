/**
 * js/projects.js
 * Project filtering and modal handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Use a short delay to ensure hydration has completed
    setTimeout(() => {
        initProjectFilters();
        initProjectModal();
    }, 50);
});

/**
 * Project Filtering with smooth animation
 */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    // Show card
                    card.classList.remove('filter-hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    
                    // Stagger the reveal
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    // Hide card with animation first
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        card.classList.add('filter-hidden');
                    }, 300);
                }
            });
        });
    });
}

/**
 * Project Modal Handling
 */
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal-close');
    
    // Use event delegation for details buttons (since they may be in hydrated DOM)
    document.addEventListener('click', (e) => {
        const detailsBtn = e.target.closest('.details-btn');
        if (detailsBtn) {
            e.preventDefault();
            const projectId = detailsBtn.getAttribute('data-project');
            openModal(projectId, modal);
        }
    });
    
    // Close Modal via button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal(modal);
        });
    }
    
    // Close Modal via overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close Modal via Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
}

function openModal(projectId, modal) {
    if (typeof portfolioConfig === 'undefined' || !portfolioConfig.projects) return;
    
    const project = portfolioConfig.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const headerEl = modal.querySelector('.modal-header');
    const bodyEl = modal.querySelector('.modal-body');
    const actionsEl = modal.querySelector('.modal-actions');
    
    // Populate header with title and tech tags
    if (headerEl) {
        headerEl.innerHTML = `
            <h2 class="modal-title">${project.title}</h2>
            <div class="modal-tech">
                ${project.technologies ? project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : ''}
            </div>
        `;
    }
    
    // Populate body with description, features, challenges, learned, future
    if (bodyEl) {
        let contentHtml = `<p>${project.fullDescription || project.shortDescription || ''}</p>`;
        
        if (project.features && project.features.length) {
            contentHtml += `<div class="modal-section"><h3 class="modal-section-title"><i class="fas fa-star"></i> Key Features</h3><ul class="modal-list">${project.features.map(f => `<li>${f}</li>`).join('')}</ul></div>`;
        }
        if (project.challenges && project.challenges.length) {
            contentHtml += `<div class="modal-section"><h3 class="modal-section-title"><i class="fas fa-puzzle-piece"></i> Challenges</h3><ul class="modal-list">${project.challenges.map(c => `<li>${c}</li>`).join('')}</ul></div>`;
        }
        if (project.learned && project.learned.length) {
            contentHtml += `<div class="modal-section"><h3 class="modal-section-title"><i class="fas fa-lightbulb"></i> What I Learned</h3><ul class="modal-list">${project.learned.map(l => `<li>${l}</li>`).join('')}</ul></div>`;
        }
        if (project.futureImprovements && project.futureImprovements.length) {
            contentHtml += `<div class="modal-section"><h3 class="modal-section-title"><i class="fas fa-rocket"></i> Future Improvements</h3><ul class="modal-list">${project.futureImprovements.map(f => `<li>${f}</li>`).join('')}</ul></div>`;
        }
        
        bodyEl.innerHTML = contentHtml;
    }
    
    // Populate actions with GitHub, Demo, and Full Details links
    if (actionsEl) {
        let actionsHtml = '';
        if (project.github && project.github !== '#') {
            actionsHtml += `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-primary"><i class="fab fa-github"></i> GitHub</a>`;
        }
        if (project.demo && project.demo !== '#' && project.demo !== '') {
            actionsHtml += `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
        }
        actionsHtml += `<a href="project.html?id=${project.id}" class="btn-secondary"><i class="fas fa-info-circle"></i> View Full Details</a>`;
        actionsEl.innerHTML = actionsHtml;
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to the trigger button
    const activeDetailsBtn = document.querySelector('.details-btn:focus, .details-btn[data-project]');
    if (activeDetailsBtn) activeDetailsBtn.focus();
}
