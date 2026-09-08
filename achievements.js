const achievements = [
    {
        date: 'Current',
        category: 'Education',
        title: "Student at Saint Olave's Grammar School",
        issuer: "Saint Olave's Grammar School",
        description: 'I study Maths, Further Maths, Physics, Chemistry, and Computer Science.',
        association: 'The current school year is shown without an invented start or end date.'
    },
    {
        date: 'Current',
        category: 'Music / Progression',
        title: 'Progressing towards Grade 8 Guitar',
        issuer: 'Trinity College London pathway',
        description: 'I am currently continuing guitar study after achieving Grade 7 Guitar Performance.',
        association: 'My guitar study began at age 5; the exact year is not recorded here.'
    },
    {
        date: 'Current',
        category: 'Music / Progression',
        title: 'Progressing towards Grade 7 Violin',
        issuer: 'ABRSM pathway',
        description: 'I am currently continuing violin study after achieving Grade 6 Violin Performance.',
        association: 'My violin study began at age 7; the exact year is not recorded here.'
    },
    {
        date: 'Aug 2025',
        category: 'Personal development',
        title: 'Duke of Edinburgh (Bronze Award)',
        issuer: "The Duke of Edinburgh's International Award Foundation",
        description: 'I completed the Bronze Award, developing my teamwork, volunteering, physical activity, and personal-skill experience.',
        association: "Saint Olave's Grammar School",
        link: 'https://www.linkedin.com/in/ashvik-dubey/details/honors/edit/forms/1867379118/'
    },
    {
        date: 'Jul 2025',
        category: 'Music / Performance',
        title: 'Grade 7 Guitarist',
        issuer: 'Trinity College London',
        description: 'I achieved my Grade 7 Guitar Performance qualification after over a decade of continuous study.',
        association: 'I am currently progressing towards Grade 8 Guitar.',
        link: 'https://www.linkedin.com/in/ashvik-dubey/details/honors/edit/forms/1867582272/'
    },
    {
        date: 'Jul 2024',
        category: 'Music / Performance',
        title: 'Grade 6 Violinist',
        issuer: 'Associated Board of the Royal Schools of Music (ABRSM)',
        description: 'I achieved my Grade 6 Violin Performance qualification after nine years of dedicated study.',
        association: 'I am currently progressing towards Grade 7 Violin.',
        link: 'https://www.linkedin.com/in/ashvik-dubey/details/honors/edit/forms/1867659954/'
    },
    {
        date: 'Jun 2024',
        category: 'School recognition',
        title: 'Team Colours for Music',
        issuer: "The Music Department at Saint Olave's Grammar School",
        description: 'I received this for my sustained commitment, contribution, and achievement within the school music community.',
        association: 'I was recognised for my musical development, performance, and representing my school through music.'
    },
    {
        date: 'Age 7',
        category: 'Music / Foundation',
        title: 'Started learning violin',
        issuer: 'Personal milestone',
        description: 'I began learning violin at age 7. The exact calendar year is not recorded here.'
    },
    {
        date: 'Age 5',
        category: 'Music / Foundation',
        title: 'Started learning guitar',
        issuer: 'Personal milestone',
        description: 'I began learning guitar at age 5. The exact calendar year is not recorded here.'
    },
    {
        date: 'Date not recorded',
        category: 'Project',
        title: 'Bhajan Slide Generator',
        issuer: 'Personal project',
        description: 'I built a utility for turning lyrics into presentation-ready slides with less repetitive formatting.',
        link: 'project.html?slug=bhajan-slide-generator'
    },
    {
        date: 'Date not recorded',
        category: 'Project',
        title: 'Binary & Hex Quest',
        issuer: 'Personal project',
        description: 'I made an interactive revision tool for number systems, conversions, and binary arithmetic.',
        link: 'project.html?slug=binary-hex-quest'
    },
    {
        date: 'Date not recorded',
        category: 'Project',
        title: 'Sound & Images',
        issuer: 'Personal project',
        description: 'I made a quiz exploring digital sound and image concepts.',
        link: 'project.html?slug=sound-and-images'
    },
    {
        date: 'Date not recorded',
        category: 'Project',
        title: 'TimeSkip',
        issuer: 'Personal project',
        description: 'I built a native Spicetify extension that lets me control when Spotify skips tracks.',
        link: 'project.html?slug=spicetify-timeskip'
    }
];

function achievementCard(item) {
    return `<article class="award-card"><div class="award-meta"><span>${item.date}</span><span>${item.category}</span></div><h3>${item.title}</h3><p class="award-issuer">${item.issuer}</p><p>${item.description}</p>${item.association ? `<p class="award-association">${item.association}</p>` : ''}${item.link ? `<a class="card-link" href="${item.link}" ${item.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.link.startsWith('http') ? 'View record' : 'Read case study'} <span>↗</span></a>` : ''}</article>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('[data-achievements-grid]');
    if (grid) grid.innerHTML = achievements.map(achievementCard).join('');
    const timeline = document.querySelector('[data-achievements-timeline]');
    if (timeline) timeline.innerHTML = achievements.map((item) => `<div class="timeline-item"><span>${item.date}</span><strong>${item.title}</strong><small>${item.category}</small></div>`).join('');
});
