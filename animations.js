const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const themeKey = 'ashvik-portfolio-theme';
const themeToggle = document.querySelector('.theme-toggle');
const page = document.body;

function setTheme(theme) {
    const isSystem = theme === 'system';
    const isLight = isSystem ? window.matchMedia('(prefers-color-scheme: light)').matches : theme === 'light';
    page.classList.toggle('light-theme', isLight);
    page.classList.toggle('dark-theme', !isLight);
    page.dataset.themePreference = theme;
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.setAttribute('aria-label', theme === 'system' ? 'Theme follows system preference' : isLight ? 'Switch to dark theme' : 'Switch to system theme');
        themeToggle.title = theme === 'system' ? 'System theme' : isLight ? 'Light theme' : 'Dark theme';
    }
}

const savedTheme = localStorage.getItem(themeKey);
const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
setTheme(savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system' ? savedTheme : 'system');

themeToggle?.addEventListener('click', () => {
    const currentTheme = page.dataset.themePreference || 'system';
    const nextTheme = currentTheme === 'system' ? 'light' : currentTheme === 'light' ? 'dark' : 'system';
    setTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
});

const colorScheme = window.matchMedia('(prefers-color-scheme: light)');
const handleSystemThemeChange = (event) => {
    if (!localStorage.getItem(themeKey) || localStorage.getItem(themeKey) === 'system') setTheme('system');
};
if (colorScheme.addEventListener) {
    colorScheme.addEventListener('change', handleSystemThemeChange);
} else {
    colorScheme.addListener(handleSystemThemeChange);
}

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
