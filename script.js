// ============================================
// PREMIUM PORTFOLIO - CINEMATIC INTERACTIONS
// ============================================

// DOM Elements
const openingAnimation = document.getElementById('openingAnimation');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const openingTitle = document.getElementById('openingTitle');
const openingSubtitle = document.getElementById('openingSubtitle');

// ============================================
// OPENING ANIMATION TIMING
// ============================================

window.addEventListener('load', () => {
    // Fade out opening after 2.5 seconds
    setTimeout(() => {
        if (openingAnimation) {
            openingAnimation.style.opacity = '0';
            openingAnimation.style.pointerEvents = 'none';
            setTimeout(() => {
                openingAnimation.style.display = 'none';
            }, 800);
        }
    }, 2500);
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scroll');
    } else {
        navbar.classList.remove('scroll');
    }
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================

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

// ============================================
// MOBILE HAMBURGER MENU
// ============================================

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR LINKS
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Learn More button scroll
const learnMoreBtn = document.querySelector('.btn-learn-more');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

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
// SCROLL REVEAL ANIMATIONS
// ============================================

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

// Observe elements
document.querySelectorAll('.section-header, .about-text, .stat-card, .skill-card, .timeline-item, .project-card, .cert-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
});

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
// PARTICLE ANIMATION
// ============================================

function createParticles() {
    const particleContainer = document.querySelector('.hero-particles');
    if (!particleContainer) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particleContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// SMOOTH PAGE TRANSITIONS
// ============================================

// Add smooth transition on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// CURSOR EFFECTS
// ============================================

document.addEventListener('mousemove', (e) => {
    // Add subtle cursor glow effect for interactive elements
    const interactive = document.elementFromPoint(e.clientX, e.clientY);
    
    if (interactive && (interactive.classList.contains('btn-learn-more') || 
        interactive.classList.contains('btn-cv-download') || 
        interactive.classList.contains('social-btn'))) {
        interactive.style.cursor = 'pointer';
    }
});

// ============================================
// SKILL CARD ANIMATIONS
// ============================================

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ============================================
// FLOATING ANIMATION FOR ELEMENTS
// ============================================

function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.skill-card, .cert-card');
    floatingElements.forEach((el, index) => {
        el.style.animation = `float 4s ease-in-out ${index * 0.2}s infinite`;
    });
}

// ============================================
// RIPPLE EFFECT ON CLICK
// ============================================

document.querySelectorAll('.btn-learn-more, .btn-cv-download, .social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// FORM VALIDATION (if form exists)
// ============================================

const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        }
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                navbar.classList.add('scroll');
            }
        });
    });
    heroObserver.observe(heroSection);
}

// ============================================
// PREVENT SCROLL ON OPENING ANIMATION
// ============================================

let openingComplete = false;

setTimeout(() => {
    openingComplete = true;
    document.body.style.overflow = 'auto';
}, 2500);

document.body.style.overflow = 'hidden';

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce scroll events
let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🌟 Welcome to Surya\'s Premium Portfolio', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ Premium Design | Cinematic Animations | Professional Experience', 'color: #764ba2; font-size: 14px;');
console.log('%c📧 Contact: suryadwisaputra739@gmail.com | 📱 WhatsApp: +62 857 3081 9709', 'color: #a0aec0; font-size: 12px;');
