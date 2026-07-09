// ============================================
// PREMIUM PORTFOLIO - MOBILE OPTIMIZED
// ============================================

// DOM Elements
const openingAnimation = document.getElementById('openingAnimation');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

// ============================================
// OPENING ANIMATION TIMING
// ============================================

window.addEventListener('load', () => {
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
// HAMBURGER MENU TOGGLE (MOBILE)
// ============================================

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

// Close menu when overlay clicked
mobileMenuOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// ============================================
// MOBILE MENU LINKS
// ============================================

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Download CV button in mobile menu
const mobileDownloadBtn = document.querySelector('.mobile-btn-cv-download');
if (mobileDownloadBtn) {
    mobileDownloadBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

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
// SMOOTH SCROLL FOR ALL LINKS
// ============================================

function smoothScrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Desktop navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            smoothScrollToSection(href);
        }
    });
});

// Learn More button
const learnMoreBtn = document.querySelector('.btn-learn-more');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToSection('#about');
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

document.querySelectorAll('.section-header, .about-text, .stat-card, .skill-card, .timeline-item, .project-card, .cert-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
});

// ============================================
// COUNT UP ANIMATION FOR STATS
// ============================================

let statsAnimated = false;

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames animation
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
// PERFORMANCE OPTIMIZATION - DEBOUNCED SCROLL
// ============================================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ============================================
// PARTICLE ANIMATION
// ============================================

function createParticles() {
    const particleContainer = document.querySelector('.hero-particles');
    if (!particleContainer) return;

    // Clear existing particles
    particleContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particleContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// RIPPLE EFFECT ON CLICK
// ============================================

document.querySelectorAll('.btn-learn-more, .btn-cv-download, .social-btn, .mobile-btn-cv-download').forEach(button => {
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
// PREVENT SCROLL DURING OPENING ANIMATION
// ============================================

let openingComplete = false;

setTimeout(() => {
    openingComplete = true;
    document.body.style.overflow = 'auto';
}, 2500);

document.body.style.overflow = 'hidden';

// ============================================
// RESPONSIVE BREAKPOINT DETECTION
// ============================================

function isMobile() {
    return window.innerWidth <= 768;
}

window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (!isMobile() && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// MICRO INTERACTIONS
// ============================================

// Card hover effects with shadow
document.querySelectorAll('.skill-card, .cert-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 30px 80px rgba(102, 126, 234, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.3)';
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🌟 Welcome to Surya\'s Premium Portfolio', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ Mobile-Optimized | Cinematic Animations | Professional Quality', 'color: #764ba2; font-size: 14px;');
console.log('%c📧 Contact: suryadwisaputra739@gmail.com | 📱 WhatsApp: +62 857 3081 9709', 'color: #a0aec0; font-size: 12px;');
