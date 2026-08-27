/**
 * js/main.js
 * Core site functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Hydrate DOM from config
    hydratePortfolio();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    initPreloader();
    initTheme();
    initNavbar();
    initScrollSpy();
    initSmoothScrolling();
    initScrollToTop();
    initResumeButton();
    initContactForm();

    if (!prefersReducedMotion) {
        initTypingAnimation();
        initCursorGlow();
    } else {
        const typingText = document.getElementById('typingText');
        if (typingText && typeof portfolioConfig !== 'undefined' && portfolioConfig.typingStrings.length > 0) {
            typingText.textContent = portfolioConfig.typingStrings[0];
        }
    }

    // Re-init scroll-reveal and stats AFTER hydration (since hydration replaces DOM)
    initScrollReveal();
    initStats();
});

/**
 * Preloader
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500); // Wait for transition
        }, 500);
    });
}

/**
 * Theme Toggle
 */
function initTheme() {
    const themeBtn = document.querySelector('.theme-toggle');
    if (!themeBtn) return;
    
    const icon = themeBtn.querySelector('i') || themeBtn;
    
    // Determine initial theme
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    
    setTheme(currentTheme);
    
    themeBtn.addEventListener('click', () => {
        currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.classList.add('theme-transition');
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
        
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (icon.classList) {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
}

/**
 * Navbar & Mobile Menu
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
    
    // Hamburger toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', toggleMenu);
        
        // Trap focus / close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu();
                hamburger.focus();
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navbar.contains(e.target)) {
                toggleMenu();
            }
        });
        
        // Close on link click
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Accessibility
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    }
}

/**
 * Active Navigation (Scroll Spy)
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -60% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

/**
 * Smooth Scrolling
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Typing Animation
 */
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText || typeof portfolioConfig === 'undefined' || !portfolioConfig.typingStrings) return;
    
    const strings = portfolioConfig.typingStrings;
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    
    function type() {
        const currentString = strings[stringIndex];
        
        if (isDeleting) {
            typingText.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }
        
        if (!isDeleting && charIndex === currentString.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            typingSpeed = 500; // Pause before new string
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

/**
 * Scroll Reveal
 */
function initScrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Animate progress bars inside revealed elements
                const progressFills = entry.target.querySelectorAll('.progress-fill');
                progressFills.forEach(fill => {
                    const targetWidth = fill.getAttribute('data-width') || fill.style.width;
                    fill.style.width = '0';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            fill.style.width = targetWidth;
                        });
                    });
                });

                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => observer.observe(el));
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Custom Cursor Glow
 */
function initCursorGlow() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    
    const cursor = document.getElementById('cursorGlow');
    const outerCursor = document.getElementById('cursorGlowOuter');
    
    if (!cursor || !outerCursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
        outerCursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        outerCursor.style.opacity = '0';
    });
    
    function animate() {
        // Direct follow for inner
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        
        // Lerp for outer
        outerX += (mouseX - outerX) * 0.15;
        outerY += (mouseY - outerY) * 0.15;
        outerCursor.style.transform = `translate(${outerX}px, ${outerY}px)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/**
 * Populate Stats from Config with animated counter
 */
function initStats() {
    if (typeof portfolioConfig === 'undefined' || !portfolioConfig.stats) return;
    
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards.length > 0 && statCards.length === portfolioConfig.stats.length) {
        portfolioConfig.stats.forEach((stat, index) => {
            const numEl = statCards[index].querySelector('.stat-number');
            const labelEl = statCards[index].querySelector('.stat-label');
            if (numEl) numEl.textContent = stat.number;
            if (labelEl) labelEl.textContent = stat.label;
        });
    }

    // Animated counter on scroll
    animateCounters();
}

/**
 * Animate stat numbers counting up
 */
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                // Parse the numeric part and suffix (e.g., "10+" -> 10, "+")
                const match = text.match(/^(\d+)(.*)$/);
                if (match) {
                    const target = parseInt(match[1], 10);
                    const suffix = match[2];
                    animateNumber(el, target, suffix);
                }
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

function animateNumber(el, target, suffix) {
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Resume Button Handling
 */
function initResumeButton() {
    const resumeBtns = document.querySelectorAll('.resume-btn, .resume-actions a');
    if (!resumeBtns.length) return;

    // Update href from config
    if (typeof portfolioConfig !== 'undefined' && portfolioConfig.resumePath) {
        resumeBtns.forEach(btn => {
            const currentHref = btn.getAttribute('href');
            if (currentHref && (currentHref.includes('resume') || currentHref === '#resume')) {
                btn.setAttribute('href', portfolioConfig.resumePath);
            }
        });
    }
    
    resumeBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const href = btn.getAttribute('href');
            if (!href || href === '#' || href === '#resume') {
                e.preventDefault();
                showResumeMessage(btn, 'Resume PDF not yet uploaded');
                return;
            }
            
            try {
                // Try to fetch headers to check if file exists
                const response = await fetch(href, { method: 'HEAD' });
                if (!response.ok) {
                    e.preventDefault();
                    showResumeMessage(btn, 'Resume PDF not yet uploaded');
                }
            } catch (err) {
                // Network error or CORS, might still exist, let it proceed or show error
                console.warn('Could not verify resume file existence', err);
            }
        });
    });
}

function showResumeMessage(btn, msg) {
    // Simple tooltip/message near the button
    let tooltip = btn.parentNode?.querySelector('.resume-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('span');
        tooltip.classList.add('resume-tooltip');
        tooltip.style.cssText = `
            position: absolute; 
            background: rgba(124, 92, 255, 0.9); 
            color: #fff; 
            padding: 8px 16px; 
            border-radius: 8px; 
            font-size: 13px; 
            margin-top: 10px; 
            z-index: 10; 
            pointer-events: none;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            white-space: nowrap;
        `;
        btn.parentNode.insertBefore(tooltip, btn.nextSibling);
        btn.parentNode.style.position = 'relative';
    }
    tooltip.textContent = msg;
    
    setTimeout(() => {
        if (tooltip.parentNode) tooltip.remove();
    }, 3000);
}

/**
 * Contact Form Validation
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Remove any existing status divs to avoid duplicates
    const existingStatus = form.querySelectorAll('.form-status');
    existingStatus.forEach((el, idx) => {
        if (idx > 0) el.remove(); // Keep first one from HTML
    });
    
    const statusMsg = form.querySelector('.form-status') || document.createElement('div');
    if (!statusMsg.parentNode) {
        statusMsg.classList.add('form-status');
        form.appendChild(statusMsg);
    }
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        form.querySelectorAll('.form-error').forEach(el => el.remove());
        
        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const message = document.getElementById('contactMessage');
        
        let isValid = true;
        
        if (!name || !name.value.trim() || name.value.trim().length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!message || !message.value.trim() || message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            handleFormSubmit(form, statusMsg);
        }
    });
    
    // Clear error on input
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            const err = input.parentNode?.querySelector('.form-error');
            if (err) err.remove();
        });
    });
}

function showError(input, message) {
    if (!input || !input.parentNode) return;
    const error = document.createElement('div');
    error.classList.add('form-error');
    error.textContent = message;
    input.parentNode.appendChild(error);
}

function handleFormSubmit(form, statusEl) {
    const config = typeof portfolioConfig !== 'undefined' ? portfolioConfig.contactForm : null;
    
    const name = document.getElementById('contactName')?.value || '';
    const email = document.getElementById('contactEmail')?.value || '';
    const subject = document.getElementById('contactSubject')?.value || '';
    const message = document.getElementById('contactMessage')?.value || '';
    
    const data = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    if (!config || config.backend === 'none') {
        statusEl.textContent = 'Contact form UI is ready. Connect this form to a backend service (Formspree, EmailJS, etc.) for actual message delivery.';
        statusEl.style.color = 'var(--text-secondary)';
        statusEl.style.marginTop = '15px';
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Send Message';
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
    }

    const restoreBtn = () => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    };
    
    if (config.backend === 'formspree') {
        statusEl.textContent = 'Sending message...';
        statusEl.style.color = 'var(--text-secondary)';
        statusEl.style.marginTop = '15px';
        
        fetch(config.formspreeEndpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                statusEl.textContent = 'Thank you! Your message has been sent successfully.';
                statusEl.style.color = '#00e699';
                form.reset();
            } else {
                return response.json().then(errData => {
                    if (errData && errData.errors) {
                        statusEl.textContent = errData.errors.map(error => error.message).join(', ');
                    } else {
                        statusEl.textContent = 'Oops! There was a problem submitting your form.';
                    }
                    statusEl.style.color = '#ff4444';
                });
            }
        })
        .catch(error => {
            console.error('Formspree submit error:', error);
            statusEl.textContent = 'Oops! There was a network error sending your message.';
            statusEl.style.color = '#ff4444';
        })
        .finally(() => {
            restoreBtn();
        });
    } else if (config.backend === 'emailjs') {
        statusEl.textContent = 'Sending message via EmailJS...';
        statusEl.style.color = 'var(--text-secondary)';
        statusEl.style.marginTop = '15px';
        
        if (typeof emailjs !== 'undefined') {
            emailjs.send(config.emailjs.serviceId, config.emailjs.templateId, {
                name: name,
                email: email,
                subject: subject,
                message: message
            }, config.emailjs.publicKey)
            .then(() => {
                statusEl.textContent = 'Thank you! Your message has been sent successfully.';
                statusEl.style.color = '#00e699';
                form.reset();
            })
            .catch(error => {
                console.error('EmailJS error:', error);
                statusEl.textContent = 'Oops! Failed to send message via EmailJS.';
                statusEl.style.color = '#ff4444';
            })
            .finally(() => {
                restoreBtn();
            });
        } else {
            statusEl.textContent = 'EmailJS SDK not loaded. Please integrate EmailJS script in your HTML.';
            statusEl.style.color = '#ffaa40';
            restoreBtn();
        }
    } else if (config.backend === 'resend') {
        statusEl.style.marginTop = '15px';
        statusEl.textContent = 'Resend cannot be used directly in client-side code to avoid exposing secret keys. Please connect this form to a secure serverless backend.';
        statusEl.style.color = '#ffaa40';
        restoreBtn();
    } else if (config.backend === 'custom') {
        statusEl.textContent = 'Sending message to custom endpoint...';
        statusEl.style.color = 'var(--text-secondary)';
        statusEl.style.marginTop = '15px';
        
        fetch(config.customEndpoint || '#', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                statusEl.textContent = 'Thank you! Your message has been sent successfully.';
                statusEl.style.color = '#00e699';
                form.reset();
            } else {
                statusEl.textContent = 'Oops! Custom server returned an error: ' + response.status;
                statusEl.style.color = '#ff4444';
            }
        })
        .catch(error => {
            console.error('Custom submit error:', error);
            statusEl.textContent = 'Oops! Network error connecting to custom backend.';
            statusEl.style.color = '#ff4444';
        })
        .finally(() => {
            restoreBtn();
        });
    }
}

/**
 * Keyboard Focus Trapping Helper for Accessibility
 */
function trapFocus(container, closeBtn) {
    if (!container) return null;
    
    const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    
    const focusableElements = container.querySelectorAll(focusableSelectors);
    if (focusableElements.length === 0) return null;
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (closeBtn) {
        closeBtn.focus();
    } else {
        firstFocusable.focus();
    }
    
    const keydownHandler = (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    };
    
    container.addEventListener('keydown', keydownHandler);
    
    return function cleanup() {
        container.removeEventListener('keydown', keydownHandler);
    };
}

/**
 * Dynamic Hydration from central config
 */
function hydratePortfolio() {
    if (typeof portfolioConfig === 'undefined') return;

    // 1. Short Name / Logo
    const shortName = portfolioConfig.shortName || 'TN';
    document.querySelectorAll('.nav-logo a, .brand-logo').forEach(el => {
        el.innerHTML = `${shortName}<span class="dot">.</span>`;
    });
    const footerBrand = document.querySelector('.footer-brand h3');
    if (footerBrand) footerBrand.textContent = `${shortName}.`;

    // 2. Personal Names and Titles
    if (portfolioConfig.name) {
        document.querySelectorAll('.hero-name').forEach(el => {
            el.textContent = portfolioConfig.name;
        });
        const codeName = document.querySelector('.code-content code');
        if (codeName) {
            codeName.innerHTML = `const developer = {
  name: '${portfolioConfig.name}',
  role: 'CSE Student',
  skills: ['C++', 'Java', 'Python'],
  passion: 'Building Things'
};`;
        }
    }

    // 3. Descriptions
    if (portfolioConfig.heroDescription) {
        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc) heroDesc.textContent = portfolioConfig.heroDescription;
    }

    if (portfolioConfig.aboutDescription) {
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            const highlights = aboutText.querySelector('.about-highlights');
            const paras = portfolioConfig.aboutDescription.map(p => `<p>${p}</p>`).join('');
            aboutText.innerHTML = paras;
            if (highlights) aboutText.appendChild(highlights);
        }
    }

    // 4. Info Badges
    if (portfolioConfig.infoBadges) {
        const badgesContainer = document.querySelector('.info-badges');
        if (badgesContainer) {
            badgesContainer.innerHTML = portfolioConfig.infoBadges.map(badge => `
                <div class="info-badge"><span>${badge.icon}</span> ${badge.text}</div>
            `).join('');
        }
    }

    // 5. Stats Section
    if (portfolioConfig.stats) {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsSection.innerHTML = portfolioConfig.stats.map(stat => `
                <div class="stat-card scroll-reveal">
                    <div class="stat-number">${stat.number}</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `).join('');
        }
    }

    // 6. Skills Section
    if (portfolioConfig.skills) {
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = portfolioConfig.skills.map(cat => `
                <div class="skill-category scroll-reveal">
                    <h3>${cat.category}</h3>
                    <div class="skill-list">
                        ${cat.items.map(item => `
                            <div class="skill-card">
                                <i class="${item.icon} skill-icon"></i>
                                <span class="skill-name">${item.name}</span>
                                <span class="skill-level" data-level="${item.level.toLowerCase()}">${item.level}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
    }

    // 7. Currently Learning
    if (portfolioConfig.currentlyLearning) {
        const learningGrid = document.querySelector('.learning-grid');
        if (learningGrid) {
            learningGrid.innerHTML = portfolioConfig.currentlyLearning.map(item => `
                <div class="learning-card">
                    <i class="${item.icon}"></i>
                    <h4>${item.name}</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${item.progress}%;" data-width="${item.progress}%"></div>
                        <span class="progress-label">${item.progress}%</span>
                    </div>
                </div>
            `).join('');
        }
    }

    // 8. Education Section
    if (portfolioConfig.education) {
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            timeline.innerHTML = portfolioConfig.education.map(item => `
                <div class="timeline-item ${item.current ? 'current' : ''} scroll-reveal">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="timeline-period">${item.period}</span>
                        <h3 class="timeline-title">${item.degree}</h3>
                        <h4 class="timeline-institution">${item.institution}</h4>
                        <p class="timeline-description">${item.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    // 9. Achievements Section
    const achievementsGrid = document.querySelector('.achievements-grid');
    if (achievementsGrid) {
        if (!portfolioConfig.achievements || portfolioConfig.achievements.length === 0) {
            achievementsGrid.innerHTML = `
                <div class="achievement-card placeholder">
                    <i class="fas fa-trophy"></i>
                    <h4>Academic Excellence</h4>
                    <p>More achievements coming soon</p>
                </div>
                <div class="achievement-card placeholder">
                    <i class="fas fa-medal"></i>
                    <h4>Project Showcases</h4>
                    <p>More achievements coming soon</p>
                </div>
                <div class="achievement-card placeholder">
                    <i class="fas fa-award"></i>
                    <h4>Competitions</h4>
                    <p>More achievements coming soon</p>
                </div>
            `;
        } else {
            achievementsGrid.innerHTML = portfolioConfig.achievements.map(item => `
                <div class="achievement-card">
                    <i class="${item.icon || 'fas fa-trophy'}"></i>
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    ${item.date ? `<span class="achievement-date">${item.date}</span>` : ''}
                </div>
            `).join('');
        }
    }

    // 10. Certifications Section
    const certGrid = document.querySelector('.cert-grid');
    if (certGrid) {
        if (!portfolioConfig.certifications || portfolioConfig.certifications.length === 0) {
            certGrid.innerHTML = `
                <div class="cert-card placeholder">
                    <i class="fas fa-certificate"></i>
                    <h4>Certifications coming soon</h4>
                    <p>Working on expanding my skill set and acquiring new credentials.</p>
                </div>
            `;
        } else {
            certGrid.innerHTML = portfolioConfig.certifications.map(item => `
                <div class="cert-card">
                    <i class="fas fa-certificate cert-icon"></i>
                    <div class="cert-info">
                        <h4>${item.name}</h4>
                        <p class="cert-issuer">${item.issuer}</p>
                        <p class="cert-date">${item.date} ${item.credentialId ? `• ID: ${item.credentialId}` : ''}</p>
                        ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="cert-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>` : ''}
                    </div>
                </div>
            `).join('');
        }
    }

    // 11. Coding Profiles
    if (portfolioConfig.codingProfiles) {
        const profilesGrid = document.querySelector('.profiles-grid');
        if (profilesGrid) {
            profilesGrid.innerHTML = portfolioConfig.codingProfiles.map(item => `
                <div class="profile-card">
                    <i class="${item.icon} profile-icon"></i>
                    <h3 class="profile-name">${item.name}</h3>
                    <p class="profile-username">${item.username}</p>
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="profile-link" aria-label="View ${item.name} Profile">${item.stats} <i class="fas fa-arrow-right"></i></a>
                </div>
            `).join('');
        }
    }

    // 12. Contact Links
    if (portfolioConfig.email && portfolioConfig.social && portfolioConfig.location) {
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo) {
            contactInfo.innerHTML = `
                <div class="contact-item">
                    <div class="contact-icon"><i class="fas fa-envelope"></i></div>
                    <div class="contact-details">
                        <h4>Email</h4>
                        <p><a href="mailto:${portfolioConfig.email}">${portfolioConfig.email}</a></p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon"><i class="fab fa-github"></i></div>
                    <div class="contact-details">
                        <h4>GitHub</h4>
                        <p><a href="${portfolioConfig.social.github}" target="_blank" rel="noopener noreferrer">${portfolioConfig.social.github.replace('https://', '')}</a></p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon"><i class="fab fa-linkedin"></i></div>
                    <div class="contact-details">
                        <h4>LinkedIn</h4>
                        <p><a href="${portfolioConfig.social.linkedin}" target="_blank" rel="noopener noreferrer">${portfolioConfig.social.linkedin.replace('https://', '')}</a></p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
                    <div class="contact-details">
                        <h4>Location</h4>
                        <p>${portfolioConfig.location}</p>
                    </div>
                </div>
            `;
        }

        // Hero socials links
        const heroSocials = document.querySelector('.hero-socials');
        if (heroSocials) {
            heroSocials.innerHTML = `
                <a href="${portfolioConfig.social.github}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub Profile"><i class="fa-brands fa-github"></i></a>
                <a href="${portfolioConfig.social.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
                <a href="mailto:${portfolioConfig.email}" class="social-icon" aria-label="Email Me"><i class="fas fa-envelope"></i></a>
            `;
        }

        // Footer Socials
        const footerSocials = document.querySelector('.footer-socials .social-icons');
        if (footerSocials) {
            footerSocials.innerHTML = `
                <a href="${portfolioConfig.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="${portfolioConfig.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="mailto:${portfolioConfig.email}" aria-label="Email"><i class="fas fa-envelope"></i></a>
            `;
        }
    }

    // 13. Resume links
    if (portfolioConfig.resumePath) {
        document.querySelectorAll('.resume-actions a').forEach(el => {
            el.setAttribute('href', portfolioConfig.resumePath);
        });
        // Also update nav resume button
        document.querySelectorAll('.resume-btn').forEach(el => {
            el.setAttribute('href', portfolioConfig.resumePath);
        });
    }

    // 14. Copyright
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        footerBottom.innerHTML = `&copy; ${new Date().getFullYear()} ${portfolioConfig.name || 'Tapajyoti Nath'}. All rights reserved.`;
    }
}
