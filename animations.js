// Typing animation for homepage
const typingText = document.querySelector('.typing-text');
if (typingText) {
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
    const scrolled = window.pageYOffset;
    const topCloud = document.querySelector('.top-cloud, .cloud-svg.top-cloud');
    const bottomCloud = document.querySelector('.bottom-cloud, .cloud-svg.bottom-cloud');
    
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
                behavior: 'smooth',
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

// ===== LIQUID GOOEY BACKGROUND ANIMATION =====
function createLiquidBackground() {
    // Create SVG element with filters and animated blobs
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "liquid-background");
    svg.setAttribute("xmlns", svgNS);
    
    // Create SVG content with filter and animated blobs
    svg.innerHTML = `
        <defs>
            <!-- Gooey filter for blob merging effect -->
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 19 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
            
            <!-- Gradient definitions for colorful blobs -->
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#2ecc71;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:#66BFBF;stop-opacity:0.5" />
            </linearGradient>
            
            <linearGradient id="gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#66BFBF;stop-opacity:0.45" />
                <stop offset="100%" style="stop-color:#2ecc71;stop-opacity:0.45" />
            </linearGradient>
            
            <radialGradient id="gradient3">
                <stop offset="0%" style="stop-color:#2ecc71;stop-opacity:0.55" />
                <stop offset="100%" style="stop-color:#E4F9F5;stop-opacity:0.25" />
            </radialGradient>
            
            <radialGradient id="gradient4">
                <stop offset="0%" style="stop-color:#66BFBF;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:#E4F9F5;stop-opacity:0.2" />
            </radialGradient>
        </defs>
        
        <g filter="url(#goo)">
            <!-- Animated blob 1 -->
            <circle class="blob blob1" r="120" fill="url(#gradient1)">
                <animate attributeName="cx" values="20%;80%;20%" dur="20s" repeatCount="indefinite" />
                <animate attributeName="cy" values="30%;70%;30%" dur="15s" repeatCount="indefinite" />
                <animate attributeName="r" values="120;140;120" dur="10s" repeatCount="indefinite" />
            </circle>
            
            <!-- Animated blob 2 -->
            <circle class="blob blob2" r="150" fill="url(#gradient2)">
                <animate attributeName="cx" values="80%;20%;80%" dur="25s" repeatCount="indefinite" />
                <animate attributeName="cy" values="70%;30%;70%" dur="18s" repeatCount="indefinite" />
                <animate attributeName="r" values="150;130;150" dur="12s" repeatCount="indefinite" />
            </circle>
            
            <!-- Animated blob 3 -->
            <circle class="blob blob3" r="100" fill="url(#gradient3)">
                <animate attributeName="cx" values="50%;30%;70%;50%" dur="30s" repeatCount="indefinite" />
                <animate attributeName="cy" values="50%;80%;20%;50%" dur="22s" repeatCount="indefinite" />
                <animate attributeName="r" values="100;120;90;100" dur="14s" repeatCount="indefinite" />
            </circle>
            
            <!-- Animated blob 4 -->
            <circle class="blob blob4" r="110" fill="url(#gradient4)">
                <animate attributeName="cx" values="70%;40%;60%;70%" dur="28s" repeatCount="indefinite" />
                <animate attributeName="cy" values="40%;60%;80%;40%" dur="20s" repeatCount="indefinite" />
                <animate attributeName="r" values="110;95;125;110" dur="16s" repeatCount="indefinite" />
            </circle>
            
            <!-- Animated blob 5 -->
            <circle class="blob blob5" r="90" fill="url(#gradient1)">
                <animate attributeName="cx" values="90%;10%;50%;90%" dur="35s" repeatCount="indefinite" />
                <animate attributeName="cy" values="20%;90%;50%;20%" dur="26s" repeatCount="indefinite" />
                <animate attributeName="r" values="90;105;85;90" dur="13s" repeatCount="indefinite" />
            </circle>
        </g>
    `;
    
    // Insert at the beginning of body
    document.body.insertBefore(svg, document.body.firstChild);
}

// Initialize liquid background when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createLiquidBackground);
} else {
    createLiquidBackground();
}

// ===== INLINE SVG IMAGES =====
// Replace external image URLs with inline SVG elements

function createCloudSVG() {
    return `<svg class="cloud-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M 60,70 Q 40,70 40,50 Q 40,30 60,30 Q 60,10 80,10 Q 100,10 100,30 Q 120,30 120,50 Q 120,70 100,70 Z" 
              fill="#FFFFFF" opacity="0.9"/>
        <ellipse cx="80" cy="75" rx="40" ry="20" fill="#FFFFFF" opacity="0.8"/>
    </svg>`;
}

function createMountainSVG() {
    return `<svg class="mountain-svg" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:#2E5C8A;stop-opacity:0.8" />
            </linearGradient>
        </defs>
        <!-- Main mountain -->
        <path d="M 0,400 L 200,100 L 300,180 L 400,80 L 600,400 Z" fill="url(#mountainGrad)"/>
        <!-- Snow cap -->
        <path d="M 200,100 L 240,140 L 160,140 Z" fill="#FFFFFF" opacity="0.9"/>
        <path d="M 400,80 L 440,120 L 360,120 Z" fill="#FFFFFF" opacity="0.9"/>
        <!-- Shadow/depth -->
        <path d="M 300,180 L 400,80 L 600,400 L 300,400 Z" fill="#2E5C8A" opacity="0.3"/>
    </svg>`;
}

function replaceImagesWithSVG() {
    // Replace cloud images
    document.querySelectorAll('img[alt="cloud"]').forEach(img => {
        const cloudDiv = document.createElement('div');
        cloudDiv.innerHTML = createCloudSVG();
        const cloudSvg = cloudDiv.firstElementChild;
        cloudSvg.className = img.className;
        img.parentNode.replaceChild(cloudSvg, img);
    });
    
    // Replace mountain images
    document.querySelectorAll('img[alt="mountain-img"]').forEach(img => {
        const mountainDiv = document.createElement('div');
        mountainDiv.innerHTML = createMountainSVG();
        const mountainSvg = mountainDiv.firstElementChild;
        mountainSvg.className = img.className;
        img.parentNode.replaceChild(mountainSvg, img);
    });
}

// Replace images when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceImagesWithSVG);
} else {
    replaceImagesWithSVG();
}

// ===== SKILL ICON SVGs =====
const skillIcons = {
    music: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 70,10 L 70,65 Q 70,75 60,75 Q 50,75 50,65 Q 50,55 60,55 Q 65,55 70,58 L 70,25 L 40,30 L 40,75 Q 40,85 30,85 Q 20,85 20,75 Q 20,65 30,65 Q 35,65 40,68 L 40,20 L 70,10 Z" 
              fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
        <circle cx="30" cy="75" r="8" fill="#27ae60"/>
        <circle cx="60" cy="65" r="8" fill="#27ae60"/>
    </svg>`,
    
    editing: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="80" height="50" rx="5" fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
        <rect x="15" y="30" width="70" height="35" fill="#E4F9F5"/>
        <path d="M 20,40 L 40,50 L 30,60 Z" fill="#66BFBF"/>
        <rect x="45" y="40" width="30" height="3" fill="#66BFBF"/>
        <rect x="45" y="48" width="25" height="3" fill="#66BFBF"/>
        <rect x="45" y="56" width="20" height="3" fill="#66BFBF"/>
    </svg>`,
    
    webdesign: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="80" height="60" rx="3" fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
        <rect x="15" y="30" width="70" height="40" fill="#E4F9F5"/>
        <line x1="15" y1="28" x2="85" y2="28" stroke="#27ae60" stroke-width="2"/>
        <circle cx="20" cy="25" r="2" fill="#E74C3C"/>
        <circle cx="27" cy="25" r="2" fill="#F39C12"/>
        <circle cx="34" cy="25" r="2" fill="#2ECC71"/>
        <text x="50" y="50" font-family="monospace" font-size="20" fill="#66BFBF" text-anchor="middle">&lt;/&gt;</text>
    </svg>`,
    
    photography: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 20,80 L 20,40 L 35,40 L 40,30 L 60,30 L 65,40 L 80,40 L 80,80 Z" 
              fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
        <circle cx="50" cy="60" r="15" fill="#E4F9F5" stroke="#27ae60" stroke-width="2"/>
        <circle cx="50" cy="60" r="10" fill="#66BFBF"/>
        <rect x="70" y="43" width="6" height="4" rx="1" fill="#E74C3C"/>
    </svg>`,
    
    programming: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="15" width="80" height="70" rx="5" fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
        <rect x="15" y="25" width="70" height="55" fill="#1a1a1a"/>
        <text x="20" y="40" font-family="monospace" font-size="8" fill="#2ecc71">&gt; code</text>
        <text x="20" y="50" font-family="monospace" font-size="8" fill="#66BFBF">function()</text>
        <text x="20" y="60" font-family="monospace" font-size="8" fill="#E4F9F5">{...}</text>
        <circle cx="18" cy="20" r="2" fill="#E74C3C"/>
        <circle cx="25" cy="20" r="2" fill="#F39C12"/>
        <circle cx="32" cy="20" r="2" fill="#2ECC71"/>
    </svg>`,
    
    gaming: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 30,35 Q 20,35 15,45 L 10,65 Q 10,75 20,75 L 30,75 Q 35,75 35,70 L 38,50 L 62,50 L 65,70 Q 65,75 70,75 L 80,75 Q 90,75 90,65 L 85,45 Q 80,35 70,35 Z" 
              fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
        <circle cx="25" cy="50" r="4" fill="#E4F9F5"/>
        <circle cx="70" cy="55" r="4" fill="#E74C3C"/>
        <circle cx="78" cy="48" r="4" fill="#F39C12"/>
        <line x1="25" y1="45" x2="25" y2="40" stroke="#27ae60" stroke-width="2"/>
        <line x1="23" y1="50" x2="18" y2="50" stroke="#27ae60" stroke-width="2"/>
    </svg>`
};

function replaceSkillIcons() {
    // Music icons
    document.querySelectorAll('img[alt="Music"], img[alt="Music Note"]').forEach(img => {
        const iconDiv = document.createElement('div');
        iconDiv.innerHTML = skillIcons.music;
        const iconSvg = iconDiv.firstElementChild;
        iconSvg.className = img.className;
        iconSvg.style.width = '80px';
        iconSvg.style.height = '80px';
        img.parentNode.replaceChild(iconSvg, img);
    });
    
    // Video Editing icons
    document.querySelectorAll('img[alt="Video Editing"]').forEach(img => {
        const iconDiv = document.createElement('div');
        iconDiv.innerHTML = skillIcons.editing;
        const iconSvg = iconDiv.firstElementChild;
        iconSvg.className = img.className;
        iconSvg.style.width = '80px';
        iconSvg.style.height = '80px';
        img.parentNode.replaceChild(iconSvg, img);
    });
    
    // Web Design icons
    document.querySelectorAll('img[alt="Web Design"]').forEach(img => {
        const iconDiv = document.createElement('div');
        iconDiv.innerHTML = skillIcons.webdesign;
        const iconSvg = iconDiv.firstElementChild;
        iconSvg.className = img.className;
        iconSvg.style.width = '80px';
        iconSvg.style.height = '80px';
        img.parentNode.replaceChild(iconSvg, img);
    });
    
    // Photography icons
    document.querySelectorAll('img[alt="Photography"]').forEach(img => {
        const iconDiv = document.createElement('div');
        iconDiv.innerHTML = skillIcons.photography;
        const iconSvg = iconDiv.firstElementChild;
        iconSvg.className = img.className;
        iconSvg.style.width = '80px';
        iconSvg.style.height = '80px';
        img.parentNode.replaceChild(iconSvg, img);
    });
    
    // Programming icons
    document.querySelectorAll('img[alt="Programming"]').forEach(img => {
        const iconDiv = document.createElement('div');
        iconDiv.innerHTML = skillIcons.programming;
        const iconSvg = iconDiv.firstElementChild;
        iconSvg.className = img.className;
        iconSvg.style.width = '80px';
        iconSvg.style.height = '80px';
        img.parentNode.replaceChild(iconSvg, img);
    });
    
    // Gaming icons
    document.querySelectorAll('img[alt="Gaming"]').forEach(img => {
        const iconDiv = document.createElement('div');
        iconDiv.innerHTML = skillIcons.gaming;
        const iconSvg = iconDiv.firstElementChild;
        iconSvg.className = img.className;
        iconSvg.style.width = '80px';
        iconSvg.style.height = '80px';
        img.parentNode.replaceChild(iconSvg, img);
    });
}

// Replace skill icons when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceSkillIcons);
} else {
    replaceSkillIcons();
}
