/* ========== COSTCO BUSINESS CENTER — SCRIPT ========== */

// Scroll Progress
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Navbar Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile Menu
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Open/Closed Status
function checkOpenStatus() {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    let isOpen = false;
    if (day >= 1 && day <= 5) { // Mon-Fri
        isOpen = currentTime >= 10 && currentTime < 20.5;
    } else if (day === 6) { // Saturday
        isOpen = currentTime >= 9.5 && currentTime < 18;
    } else if (day === 0) { // Sunday
        isOpen = currentTime >= 10 && currentTime < 18;
    }

    if (statusDot && statusText) {
        if (isOpen) {
            statusDot.classList.add('open');
            statusDot.classList.remove('closed');
            statusText.textContent = 'Open Now';
            statusText.style.color = '#16a34a';
        } else {
            statusDot.classList.add('closed');
            statusDot.classList.remove('open');
            statusText.textContent = 'Closed';
            statusText.style.color = '#ef4444';
        }
    }
}
checkOpenStatus();
setInterval(checkOpenStatus, 60000);

// Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal, .reveal-right, .reveal-left');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// Savings Calculator
const calcBtn = document.getElementById('calcBtn');
const savingsNum = document.getElementById('savingsNum');
if (calcBtn) {
    calcBtn.addEventListener('click', () => {
        const businessType = document.getElementById('businessType').value;
        const monthlySpend = parseInt(document.getElementById('monthlySpend').value);

        // Savings multiplier based on business type
        const multipliers = {
            restaurant: 0.38,
            office: 0.30,
            catering: 0.35,
            retail: 0.32
        };

        const avgSpend = monthlySpend === 500 ? 750 :
                         monthlySpend === 1000 ? 2000 :
                         monthlySpend === 3000 ? 4000 : 6000;

        const savingsRate = multipliers[businessType] || 0.35;
        const annualSavings = Math.round(avgSpend * 12 * savingsRate);

        // Animate counter
        let current = 0;
        const target = annualSavings;
        const duration = 1500;
        const step = target / (duration / 16);

        function animateCounter() {
            current += step;
            if (current >= target) {
                current = target;
                savingsNum.textContent = '$' + target.toLocaleString();
                return;
            }
            savingsNum.textContent = '$' + Math.round(current).toLocaleString();
            requestAnimationFrame(animateCounter);
        }
        animateCounter();
    });
}

// Form Validation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');

        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.classList.remove('error');
        });

        if (!name.value.trim()) { name.classList.add('error'); valid = false; }
        if (!phone.value.trim() || phone.value.trim().length < 7) { phone.classList.add('error'); valid = false; }

        if (valid) {
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
            formSuccess.style.display = 'block';
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
