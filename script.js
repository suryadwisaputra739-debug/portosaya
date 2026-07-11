// ============================================
// INTERACTIVE INTRO SCREEN + PORTFOLIO
// ============================================

// DOM Elements
const introScreen = document.getElementById('introScreen');
const introButton = document.getElementById('introButton');
const portfolioWrapper = document.getElementById('portfolioWrapper');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const introParticles = document.getElementById('introParticles');

let portfolioRevealed = false;

// ============================================
// CREATE INTRO PARTICLES
// ============================================

function createIntroParticles() {
    if (!introParticles) return;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'intro-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 2.5 + 1.5) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 12 + 20) + 's';
        introParticles.appendChild(particle);
    }
}

createIntroParticles();

// ============================================
// INTRO BUTTON - CLICK HANDLER
// ============================================

introButton.addEventListener('click', handleIntroButtonClick);
introButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleIntroButtonClick();
    }
});

// Also listen for actual Enter key press anywhere
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !portfolioRevealed && introScreen.offsetParent !== null) {
        handleIntroButtonClick();
    }
});

function handleIntroButtonClick() {
    if (portfolioRevealed) return;

    portfolioRevealed = true;

    // 1. Keycap sinks down (handled by .pressed CSS transform)
    introButton.classList.add('pressed');

    // 2. Ripple emerges from the switch center
    createKeyRipple(introButton);

    // Slight backdrop blur begins immediately
    introScreen.style.backdropFilter = 'blur(10px)';

    // 3. After the press settles, release + bounce the keycap back up
    setTimeout(() => {
        introButton.classList.remove('pressed');
        introButton.classList.add('bounce');
    }, 140);

    // 4. Once the bounce plays out, begin the cinematic reveal
    setTimeout(() => {
        revealPortfolio();
    }, 420);
}

// ============================================
// KEY RIPPLE (mechanical, radiates from switch)
// ============================================

function createKeyRipple(assembly) {
    const cap = assembly.querySelector('.keycap-face');
    if (!cap) return;
    const ripple = document.createElement('span');
    ripple.className = 'key-ripple';
    cap.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
}

// ============================================
// RIPPLE EFFECT FOR BUTTON
// ============================================

function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = size / 2;
    const y = size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (x - size / 2) + 'px';
    ripple.style.top = (y - size / 2) + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ============================================
// REVEAL PORTFOLIO - CINEMATIC TRANSITION
// ============================================

function revealPortfolio() {
    // Make portfolio wrapper visible with fade animation
    portfolioWrapper.classList.add('visible');
    
    // Fade out and hide intro screen
    setTimeout(() => {
        introScreen.classList.add('hidden');
    }, 600);
    
    // Enable scrolling
    document.body.style.overflow = 'auto';
    
    // Trigger scroll animations
    setTimeout(() => {
        triggerScrollRevealAnimations();
    }, 800);
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
// INTRO BUTTON HOVER EFFECT - MOUSE TRACKING (DESKTOP ONLY)
// ============================================

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768 && introScreen.offsetParent !== null) {
        const cap = introButton.querySelector('.key-cap');
        const reflection = introButton.querySelector('.keycap-reflection');
        if (!cap) return;
        const rect = introButton.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Subtle 3D tilt following cursor, layered on top of the isometric press transform
        const xRotation = (y / rect.height) * 8;
        const yRotation = (x / rect.width) * -8;

        if (introScreen.classList.contains('hidden') === false && !introButton.classList.contains('pressed')) {
            cap.style.transform = `translate(-50%, -50%) translateZ(72px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            if (reflection) {
                reflection.style.transform = `rotate(${-18 + yRotation}deg) translate(${xRotation}px, ${yRotation}px)`;
            }
        }
    }
});

// Reset tilt on mouse leave (must keep the centering transform intact)
introButton.addEventListener('mouseleave', () => {
    const cap = introButton.querySelector('.key-cap');
    const reflection = introButton.querySelector('.keycap-reflection');
    if (cap) cap.style.transform = 'translate(-50%, -50%) translateZ(72px)';
    if (reflection) reflection.style.transform = '';
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

    particleContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particleContainer.appendChild(particle);
    }
}

// ============================================
// RIPPLE EFFECT ON CLICK
// ============================================

function addRippleToButton(button) {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('intro-button')) return; // Skip intro button
        
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
}

// Add ripple to all buttons when portfolio is revealed
setTimeout(() => {
    document.querySelectorAll('.btn-learn-more, .btn-cv-download, .social-btn, .mobile-btn-cv-download').forEach(button => {
        addRippleToButton(button);
    });
}, 1000);

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

// Wait until portfolio is revealed
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

console.log('%c🎮 INTERACTIVE INTRO SCREEN LOADED', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ Press ENTER or click the button to explore the portfolio', 'color: #764ba2; font-size: 14px;');
console.log('%c🚀 Premium 3D Mechanical Button | Cinematic Reveal | Mobile Optimized', 'color: #a0aec0; font-size: 12px;');
console.log('%c📧 Contact: suryadwisaputra739@gmail.com | 📱 +62 857 3081 9709', 'color: #667eea; font-size: 11px;');
