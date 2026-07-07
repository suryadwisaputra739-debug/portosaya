// ============================================
// 3D PORTFOLIO INTERACTIONS
// ============================================

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .timeline-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// 3D Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const gradients = document.querySelectorAll('.gradient-1, .gradient-2, .gradient-3');
    gradients.forEach((gradient, index) => {
        gradient.style.transform = `translateY(${scrolled * (0.3 + index * 0.15)}px) rotateZ(${scrolled * 0.05}deg)`;
    });
});

// 3D Mouse tracking effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const cards = document.querySelectorAll('.skill-card, .contact-card, .timeline-content');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const distanceX = (e.clientX - cardCenterX) * 0.02;
        const distanceY = (e.clientY - cardCenterY) * 0.02;
        
        if (Math.abs(distanceX) < 50 && Math.abs(distanceY) < 50) {
            card.style.transform = `perspective(1000px) rotateX(${-distanceY}deg) rotateY(${distanceX}deg)`;
        }
    });
});

// Reset 3D effect on mouse leave
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.skill-card, .contact-card, .timeline-content');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Console Message
console.log('%c🎨 Welcome to Surya\'s 3D Portfolio', 'color: #6c5ce7; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #6c5ce7;');
console.log('%c✨ Crafting Organizational Excellence in 3D', 'color: #0984e3; font-size: 14px;');
