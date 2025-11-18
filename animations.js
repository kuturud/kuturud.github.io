// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Typing animation for homepage
const typingText = document.querySelector('.typing-text');
if (typingText && !prefersReducedMotion) {
    const words = ['programmer', 'musician', 'creator', 'YouTuber'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing animation
    type();
}

// Scroll animations - fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Parallax scrolling for clouds
window.addEventListener('scroll', () => {
    if (prefersReducedMotion) return;
    
    const scrolled = window.pageYOffset;
    const topCloud = document.querySelector('.emoji-cloud.top-cloud');
    const bottomCloud = document.querySelector('.emoji-cloud.bottom-cloud');
    
    if (topCloud) {
        topCloud.style.transform = `translateX(${scrolled * 0.3}px)`;
    }
    if (bottomCloud) {
        bottomCloud.style.transform = `translateX(-${scrolled * 0.2}px)`;
    }
});

// Active navigation highlighting
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Smooth scroll behavior is handled by CSS
// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add loading animation fade out
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== FLOATING EMOJI BACKGROUND =====
function createEmojiBackground() {
    if (prefersReducedMotion) return;
    
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-background';
    emojiContainer.setAttribute('aria-hidden', 'true');
    
    // Array of subtle emojis for background
    const backgroundEmojis = ['☁️', '⛰️', '🎵', '💻', '🎬', '📷'];
    
    backgroundEmojis.forEach((emoji) => {
        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'floating-emoji';
        emojiSpan.textContent = emoji;
        emojiContainer.appendChild(emojiSpan);
    });
    
    document.body.insertBefore(emojiContainer, document.body.firstChild);
}

// Initialize emoji background when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createEmojiBackground);
} else {
    createEmojiBackground();
}
