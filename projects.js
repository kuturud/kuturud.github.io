const portfolioProjects = [
    {
        slug: 'bhajan-slide-generator',
        title: 'Bhajan Slide Generator',
        type: 'Utility',
        category: 'Web',
        description: 'I built a tool for turning lyrics into clean, presentation-ready slides.',
        problem: 'Formatting lyric slides by hand can repeat the same work each time a presentation is prepared.',
        approach: 'I focused on a small input-to-output flow: enter the lyrics, keep the content readable, and produce slides without extra setup.',
        learning: 'This project helped me think about content structure, readable presentation layouts, and keeping a utility focused.',
        next: 'I would like to keep refining the slide layouts and add more tested output options when there is a real need for them.',
        detail: 'I built this to remove repetitive formatting work from preparing lyric slides. The focus is a quick input-to-output flow that keeps the content readable on screen.',
        href: '/bhajan-slide-generator',
        external: true,
        technologies: ['HTML', 'CSS', 'JavaScript'],
        codeExcerpt: 'const slides = lyrics.split(/blank-line/);',
        imageDirectory: 'images/bhajan-slide-generator/',
        images: []
    },
    {
        slug: 'binary-hex-quest',
        title: 'Binary & Hex Quest',
        type: 'Experiment',
        category: 'Computer Science',
        description: 'I built interactive practice for number systems, conversions, and binary arithmetic.',
        problem: 'I wanted revision for number systems to feel more active than reading notes and checking answers afterwards.',
        approach: 'I made a browser-based revision tool with topic sections, difficulty levels, hints, scoring, and end-of-session feedback.',
        learning: 'Building the question flow made me practise separating content from interaction logic and giving useful feedback.',
        next: 'I would add more question sets and continue testing the wording of explanations as the revision content grows.',
        detail: 'I made a browser-based revision tool with topic sections, difficulty levels, hints, scoring, and end-of-session feedback.',
        href: 'binary.html',
        technologies: ['HTML', 'CSS', 'JavaScript', 'OCR GCSE CS'],
        codeExcerpt: 'function checkAnswer(answer, question) {\n    return answer.trim() === question.answer;\n}',
        imageDirectory: 'images/binary-hex-quest/',
        images: []
    },
    {
        slug: 'sound-and-images',
        title: 'Sound & Images',
        type: 'Experiment',
        category: 'Study Tools',
        description: 'I made a quiz exploring digital sound and image concepts.',
        problem: 'Digital media calculations are easier to remember when I can practise applying the ideas, not just list definitions.',
        approach: 'I created a focused learning experience for sampling, file size, resolution, colour depth, and related digital media calculations.',
        learning: 'The project gave me a practical way to connect interface feedback with the underlying computer-science concepts.',
        next: 'I would expand the question bank and make the explanations more useful for reviewing mistakes.',
        detail: 'I created a focused learning experience for sampling, file size, resolution, colour depth, and related digital media calculations.',
        href: 'sound.html',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Digital media'],
        codeExcerpt: 'const fileSize = sampleRate * bitDepth * channels * duration;',
        imageDirectory: 'images/sound-and-images/',
        images: []
    },
    {
        slug: 'spicetify-timeskip',
        title: 'TimeSkip',
        type: 'Extension',
        category: 'Computer Science',
        description: 'I built a native Spicetify extension that lets me control when Spotify skips tracks.',
        problem: 'I wanted more deliberate control over how long a track remains in a listening queue while discovering music.',
        approach: 'I added a top-bar control that advances the queue after a configurable duration, with an inline control for changing the threshold while listening.',
        learning: 'Working with a host application made me think about integration points, small controls, and making configuration available at the moment it is useful.',
        next: 'I would continue checking the extension against Spicetify changes and refine the control experience as I use it.',
        detail: 'I made TimeSkip for more deliberate playlist curation and music discovery. It adds a control to Spotify’s top bar, automatically advances the queue after a configurable duration, and gives me an inline control for changing that threshold while I listen.',
        href: 'https://github.com/kuturud/spicetify-timeskip',
        github: 'https://github.com/kuturud/spicetify-timeskip',
        technologies: ['JavaScript', 'Spicetify', 'Spotify'],
        repository: {
            owner: 'kuturud',
            name: 'spicetify-timeskip',
            defaultBranch: 'main'
        },
        codeExcerpt: 'setTimeout(() => {\n    nextTrack();\n}, skipAfter * 1000);',
        imageDirectory: 'images/timeskip/',
        images: []
    }
];

function escapeHTML(value = '') {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

function safeHref(value = '') {
    const href = String(value);
    const isAbsolute = /^https?:\/\//.test(href) || href.startsWith('/');
    const isRelativeAsset = /^[a-zA-Z0-9._/-]+(?:[?#].*)?$/.test(href);
    return (isAbsolute || isRelativeAsset) && !href.startsWith('//') ? escapeHTML(href) : '#';
}

function projectCard(project) {
    const caseStudyHref = `project.html?slug=${encodeURIComponent(project.slug)}`;
    return `<article class="hardware-card project-card" data-category="${escapeHTML(project.category)}" data-project-search="${escapeHTML(`${project.title} ${project.description} ${project.technologies.join(' ')}`.toLowerCase())}">
        <div class="card-topline"><span>${escapeHTML(project.type)}</span><span>${escapeHTML(project.category)}</span></div>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <div class="tag-list project-tags">${project.technologies.map((technology) => `<span>${escapeHTML(technology)}</span>`).join('')}</div>
        <a class="card-link" href="${caseStudyHref}">Read my case study <span>↗</span></a>
    </article>`;
}

function renderProjects(target, projects = portfolioProjects) {
    if (!target) return;
    target.innerHTML = projects.length ? projects.map(projectCard).join('') : '<p class="github-empty">No projects match that search.</p>';
}

function detailBlock(label, heading, content) {
    if (!content) return '';
    return `<article class="hardware-card"><p class="eyebrow">${escapeHTML(label)}</p><h2>${escapeHTML(heading)}</h2><p>${escapeHTML(content)}</p></article>`;
}

function renderProjectDetail(target, project) {
    if (!target || !project) return;
    const gallery = project.images?.length
        ? `<section class="project-gallery" aria-label="Project screenshots">${project.images.map((image) => `<figure><img src="${safeHref(image.src)}" alt="${escapeHTML(image.alt)}" loading="lazy"><figcaption>${escapeHTML(image.caption || '')}</figcaption></figure>`).join('')}</section>`
        : '';
    const repository = project.repository
        ? `<article class="hardware-card"><p class="eyebrow">Repository</p><h2>${escapeHTML(project.repository.name)}</h2><p>${escapeHTML(project.repository.owner)} · default branch: ${escapeHTML(project.repository.defaultBranch || 'not specified')}</p><a class="card-link" href="${safeHref(project.github)}" target="_blank" rel="noopener noreferrer">Open repository <span>↗</span></a></article>`
        : '';
    const code = project.codeExcerpt
        ? `<article class="hardware-card code-excerpt"><p class="eyebrow">Code excerpt</p><h2>A small implementation detail</h2><pre><code>${escapeHTML(project.codeExcerpt)}</code></pre></article>`
        : '';
    const galleryNote = !project.images?.length && project.imageDirectory
        ? `<p class="project-gallery-note">Screenshots can be added later from <code>${escapeHTML(project.imageDirectory)}</code>; no placeholder images are shown.</p>`
        : '';
    const openHref = project.github || project.href;
    const openLabel = project.github ? 'View on GitHub' : project.external ? 'Open project' : 'Open experiment';
    target.innerHTML = `
        <section class="hero project-detail-hero">
            <p class="eyebrow">${escapeHTML(project.type)} / ${escapeHTML(project.category)}</p>
            <h1>${escapeHTML(project.title)}</h1>
            <p class="hero-statement">${escapeHTML(project.description)}</p>
            <div class="hero-actions"><a class="button button-primary" href="${safeHref(openHref)}" ${project.github ? 'target="_blank" rel="noopener noreferrer"' : ''}>${openLabel} <span>↗</span></a><a class="button button-quiet" href="projects.html">All projects <span>→</span></a></div>
        </section>
        <section class="detail-grid" aria-label="Project case study">
            ${detailBlock('Problem', 'Why I made it', project.problem || project.detail)}
            ${detailBlock('Approach', 'How I built it', project.approach)}
            ${detailBlock('Learning', 'What I learned', project.learning)}
            ${detailBlock('Next', 'Where it could go', project.next)}
            <article class="hardware-card"><p class="eyebrow">Built with</p><h2>Tools and ideas</h2><div class="tag-list project-tags">${project.technologies.map((technology) => `<span>${escapeHTML(technology)}</span>`).join('')}</div></article>
            ${repository}${code}
        </section>${gallery}${galleryNote}`;
    document.title = `${project.title} — Ashvik Dubey`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = project.description;
    const socialTitle = document.querySelector('meta[property="og:title"]');
    const socialDescription = document.querySelector('meta[property="og:description"]');
    const socialUrl = document.querySelector('meta[property="og:url"]');
    if (socialTitle) socialTitle.content = `${project.title} — Ashvik Dubey`;
    if (socialDescription) socialDescription.content = project.description;
    const canonical = document.querySelector('link[rel="canonical"]');
    const projectUrl = `${window.location.origin}${window.location.pathname}?slug=${encodeURIComponent(project.slug)}`;
    if (canonical) canonical.href = projectUrl;
    if (socialUrl) socialUrl.content = projectUrl;
    const structuredData = document.querySelector('#project-structured-data');
    if (structuredData) structuredData.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: projectUrl,
        creator: { '@type': 'Person', name: 'Ashvik Dubey' },
        keywords: project.technologies
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('[data-project-grid]');
    const search = document.querySelector('[data-project-search]');
    const filters = document.querySelectorAll('[data-project-filter]');
    let activeCategory = 'All';

    const updateProjectList = () => {
        const query = search?.value.trim().toLowerCase() || '';
        const filtered = portfolioProjects.filter((project) => {
            const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
            const searchable = `${project.title} ${project.description} ${project.category} ${project.technologies.join(' ')}`.toLowerCase();
            return matchesCategory && (!query || searchable.includes(query));
        });
        renderProjects(projectGrid, filtered);
    };

    updateProjectList();
    search?.addEventListener('input', updateProjectList);
    filters.forEach((filter) => filter.addEventListener('click', () => {
        filters.forEach((item) => item.classList.toggle('active', item === filter));
        activeCategory = filter.dataset.projectFilter;
        updateProjectList();
    }));

    const slug = new URLSearchParams(window.location.search).get('slug');
    const project = portfolioProjects.find((item) => item.slug === slug);
    if (project) {
        renderProjectDetail(document.querySelector('[data-project-detail]'), project);
    } else if (document.querySelector('[data-project-detail]')) {
        document.querySelector('[data-project-detail]').innerHTML = `
            <section class="hero project-detail-hero">
                <p class="eyebrow">Projects / Not found</p>
                <h1>This build<br>doesn’t exist.</h1>
                <p class="hero-statement">I haven’t added that project to my catalogue yet. You can browse the tools and experiments I have made, or get in touch with me.</p>
                <div class="hero-actions"><a class="button button-primary" href="projects.html">Browse my projects <span>↗</span></a><a class="button button-quiet" href="contact.html">Contact me <span>→</span></a></div>
            </section>`;
    }
});
