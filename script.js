// ============================================
// PREMIUM 3D MECHANICAL KEYCAP - INTERACTION
// ============================================

// DOM Elements
const introScreen = document.getElementById('introScreen');
const mechanicalKeycap = document.getElementById('mechanicalKeycap');
const portfolioWrapper = document.getElementById('portfolioWrapper');
const ambientParticles = document.getElementById('ambientParticles');
const keycapParticles = document.getElementById('keycapParticles');

let portfolioRevealed = false;
let isAnimating = false;

// ============================================
// CREATE AMBIENT PARTICLES
// ============================================

function createAmbientParticles() {
    if (!ambientParticles) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'ambient-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.setProperty('--x-offset', (Math.random() * 100 - 50) + 'px');
        particle.style.setProperty('--y-offset', (-Math.random() * 150 - 50) + 'px');
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
        ambientParticles.appendChild(particle);
    }
}

createAmbientParticles();

// ============================================
// CREATE KEYCAP PARTICLES
// ============================================

function createKeycapParticles() {
    if (!keycapParticles) return;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'keycap-particle';
        particle.style.left = (50 + (Math.random() - 0.5) * 60) + 'px';
        particle.style.top = (50 + (Math.random() - 0.5) * 60) + 'px';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
        particle.style.setProperty('--ty', (-Math.random() * 150 - 50) + 'px');
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 12 + 18) + 's';
        keycapParticles.appendChild(particle);
    }
}

createKeycapParticles();

// ============================================
// MOUSE TRACKING - 3D PERSPECTIVE
// ============================================

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768 && !portfolioRevealed && introScreen.offsetParent !== null) {
        const rect = mechanicalKeycap.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Calculate rotation based on mouse position
        const rotateX = (y / rect.height) * 8;
        const rotateY = (x / rect.width) * -8;
        
        const container = mechanicalKeycap.querySelector('.keycap-container');
        if (container) {
            container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    }
});

// Reset tilt on mouse leave
mechanicalKeycap.addEventListener('mouseleave', () => {
    const container = mechanicalKeycap.querySelector('.keycap-container');
    if (container) {
        container.style.transform = '';
    }
});

// ============================================
// KEYCAP CLICK HANDLER
// ============================================

mechanicalKeycap.addEventListener('click', handleKeycapClick);
mechanicalKeycap.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleKeycapClick();
    }
});

// ENTER key support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !portfolioRevealed && introScreen.offsetParent !== null) {
        handleKeycapClick();
    }
});

function handleKeycapClick() {
    if (portfolioRevealed || isAnimating) return;
    
    isAnimating = true;
    portfolioRevealed = true;
    
    // Add pressed state
    mechanicalKeycap.classList.add('pressed');
    
    // Trigger ripple effect
    createRippleEffect();
    
    // Play press animation sequence
    setTimeout(() => {
        // Keycap bounces
        mechanicalKeycap.style.animation = 'none';
        
        setTimeout(() => {
            revealPortfolio();
        }, 100);
    }, 400);
}

// ============================================
// RIPPLE EFFECT
// ============================================

function createRippleEffect() {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '160px';
    ripple.style.height = '160px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)';
    ripple.style.top = '0';
    ripple.style.left = '0';
    ripple.style.animation = 'rippleExpand 0.6s ease-out forwards';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '100';
    
    mechanicalKeycap.appendChild(ripple);
    
    // Add ripple animation keyframes if not exists
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            @keyframes rippleExpand {
                from {
                    transform: scale(0.1);
                    opacity: 1;
                }
                to {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => ripple.remove(), 600);
}

// ============================================
// REVEAL PORTFOLIO - CINEMATIC
// ============================================

function revealPortfolio() {
    // Add visible class to portfolio
    portfolioWrapper.classList.add('visible');
    
    // Fade out intro screen
    setTimeout(() => {
        introScreen.classList.add('hidden');
    }, 600);
    
    // Enable scrolling
    document.body.style.overflow = 'auto';
    
    // Trigger scroll animations
    setTimeout(() => {
        triggerScrollRevealAnimations();
    }, 800);
    
    isAnimating = false;
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function triggerScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-header, .about-text, .stat-card, .skill-card, .timeline-item, .project-card, .cert-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        revealObserver.observe(el);
    });
}

// ============================================
// PORTFOLIO NAVIGATION
// ============================================

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

// Hamburger menu toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

mobileMenuOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu on link click
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

const mobileDownloadBtn = document.querySelector('.mobile-btn-cv-download');
if (mobileDownloadBtn) {
    mobileDownloadBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scroll');
    } else {
        navbar.classList.remove('scroll');
    }
});

// Active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Smooth scroll for links
function smoothScrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            smoothScrollToSection(href);
        }
    });
});

const learnMoreBtn = document.querySelector('.btn-learn-more');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToSection('#about');
    });
}

// Back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// COUNT UP ANIMATION FOR STATS
// ============================================

let statsAnimated = false;

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'));
                    animateCounter(el, target);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    imageObserver.observe(img);
});

// ============================================
// PREVENT SCROLL DURING INTRO
// ============================================

document.body.style.overflow = 'hidden';

// ============================================
// RESPONSIVE BREAKPOINT DETECTION
// ============================================

function isMobile() {
    return window.innerWidth <= 768;
}

window.addEventListener('resize', () => {
    if (!isMobile() && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// MICRO INTERACTIONS - CARD SHADOWS
// ============================================

setTimeout(() => {
    document.querySelectorAll('.skill-card, .cert-card, .project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 30px 80px rgba(102, 126, 234, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.3)';
        });
    });
}, 1000);

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🎮 PREMIUM 3D MECHANICAL KEYCAP - INTRO SCREEN', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ Press ENTER or click the keycap to explore', 'color: #764ba2; font-size: 14px;');
console.log('%c🚀 Realistic 3D Design | Premium Lighting | Mechanical Animation', 'color: #a0aec0; font-size: 12px;');
