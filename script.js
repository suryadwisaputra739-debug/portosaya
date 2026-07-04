// ============================================
// NEON CYBERPUNK PORTFOLIO JS
// ============================================

// ============================================
// DARK MODE TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ============================================
// 3D ID CARD EFFECT - MOUSE TRACKING
// ============================================

const idCard = document.getElementById('idCard');

document.addEventListener('mousemove', (e) => {
    const rect = idCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const xAxis = (centerX - e.pageX) / 30;
    const yAxis = (centerY - e.pageY) / 30;
    
    idCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

idCard.addEventListener('mouseenter', () => {
    idCard.style.transition = 'none';
});

idCard.addEventListener('mouseleave', () => {
    idCard.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
    idCard.style.transform = 'rotateY(0) rotateX(0)';
});

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .glass-effect').forEach(el => {
    observer.observe(el);
});

// ============================================
// SKILL PROGRESS ANIMATION
// ============================================

const progressBars = document.querySelectorAll('.skill-progress');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = width;
            }, 100);
            
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ============================================
// BUTTON INTERACTIONS
// ============================================

const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent.includes('EXPLORE')) {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        } else if (btn.textContent.includes('CV')) {
            window.open('cv.pdf', '_blank');
        }
    });
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glows = document.querySelectorAll('.glow-1, .glow-2, .glow-3');
    
    glows.forEach((glow, index) => {
        glow.style.transform = `translateY(${scrolled * (0.5 + index * 0.1)}px)`;
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log(
    `%c
    ███████╗██╗   ██╗██████╗ ██╗   ██╗ █████╗ 
    ██╔════╝██║   ██║██╔══██╗╚██╗ ██╔╝██╔══██╗
    ███████╗██║   ██║██████╔╝ ╚████╔╝ ███████║
    ╚════██║██║   ██║██╔══██╗  ╚██╔╝  ██╔══██║
    ███████║╚██████╔╝██║  ██║   ██║   ██║  ██║
    ╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
    `,
    'color: #00d4ff; font-family: monospace; font-weight: bold; text-shadow: 0 0 10px #00d4ff;'
);

console.log('%cWelcome to Cyberpunk Portfolio!', 'color: #ff006e; font-size: 16px; font-weight: bold;');
console.log('%c@sryaasptraa | +62 857 3081 9709', 'color: #00d4ff; font-size: 12px;');