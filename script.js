// ============================================
// PREMIUM PORTFOLIO - INTERACTIVE EFFECTS
// ============================================

// ============================================
// THEME TOGGLE
// ============================================

const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeBtn.querySelector('i');
    if (theme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ============================================
// 3D CARD MOUSE TRACKING
// ============================================

const profileCard = document.getElementById('profileCard');

document.addEventListener('mousemove', (e) => {
    if (!profileCard) return;
    
    const rect = profileCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 30;
    const rotateY = (centerX - e.clientX) / 30;
    
    profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.addEventListener('mouseleave', () => {
    if (profileCard) {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }
});

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill bars
document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.opacity = '0';
    observer.observe(bar);
});

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ============================================
// BUTTON INTERACTIONS
// ============================================

const exploreBtn = document.querySelector('.btn-primary');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// NAVBAR ACTIVE LINK
// ============================================

const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
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

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log(
    '%c✨ Welcome to Surya\'s Portfolio ✨',
    'color: #6366f1; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cLet\'s create something amazing together!',
    'color: #ec4899; font-size: 12px;'
);
