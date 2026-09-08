const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const themeKey = 'ashvik-portfolio-theme';
const themeToggle = document.querySelector('.theme-toggle');
const page = document.body;

function setTheme(theme) {
    const isLight = theme === 'light';
    page.classList.toggle('light-theme', isLight);
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }
}

const savedTheme = localStorage.getItem(themeKey);
setTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle?.addEventListener('click', () => {
    const nextTheme = page.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
});

const navLinks = document.querySelectorAll('.nav-links a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html'));
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
        });
    });
});
