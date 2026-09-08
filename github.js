const githubTarget = document.querySelector('[data-github-projects]');

function escapeGitHubHTML(value = '') {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

function formatUpdatedDate(value) {
    if (!value) return 'Updated date unavailable';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Updated date unavailable' : `Updated ${new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)}`;
}

async function loadGitHubProjects() {
    if (!githubTarget) return;
    try {
        const response = await fetch('https://api.github.com/users/kuturud/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
        const repositories = await response.json();
        const visible = repositories.filter((repo) => !repo.fork && !repo.archived);
        githubTarget.innerHTML = visible.length
            ? visible.map((repo) => {
                const metadata = [
                    repo.language || 'Language not specified',
                    formatUpdatedDate(repo.updated_at),
                    `★ ${Number.isFinite(repo.stargazers_count) ? repo.stargazers_count : 0}`,
                    `⑂ ${Number.isFinite(repo.forks_count) ? repo.forks_count : 0}`
                ].join(' · ');
                const repositoryUrl = /^https:\/\/github\.com\//.test(repo.html_url || '') ? repo.html_url : 'https://github.com/kuturud';
                return `<a class="github-project-row" href="${escapeGitHubHTML(repositoryUrl)}" target="_blank" rel="noopener noreferrer"><span><b>${escapeGitHubHTML(repo.name)}</b><small>${escapeGitHubHTML(repo.description || 'Repository on GitHub')}</small><small class="github-project-meta">${escapeGitHubHTML(metadata)}</small></span><span class="row-arrow" aria-hidden="true">↗</span></a>`;
            }).join('')
            : '<p class="github-empty">No public repositories to show yet.</p>';
    } catch (error) {
        console.error(error);
        githubTarget.innerHTML = '<p class="github-empty">GitHub projects are unavailable right now. Visit the profile directly.</p>';
    }
}

loadGitHubProjects();
