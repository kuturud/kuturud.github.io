# Ashvik Dubey portfolio

Static GitHub Pages portfolio for `ashvikdubey.com`.

## Run it locally

This is a static site: open `index.html` directly, or serve this directory with any static HTTP server. No build step or package installation is required.

## Add or update a project

Edit `projects.js` and add an object to `portfolioProjects`. The case-study template at `project.html?slug=my-project` supports:

```js
{
    slug: 'my-project',
    title: 'My Project',
    type: 'Build',
    category: 'Web',
    description: 'One sentence shown on the projects grid.',
    problem: 'What problem or question led me to make it.',
    approach: 'The practical approach I took.',
    learning: 'What I learned while making it.',
    next: 'A realistic next step, without claiming it is already done.',
    detail: 'Fallback overview copy.',
    href: 'https://example.com',
    external: true,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    codeExcerpt: 'const example = true;',
    imageDirectory: 'images/my-project/',
    images: []
}
```

Use `external: false` for local pages. A GitHub project can add `github: 'https://github.com/owner/repository'` and optional `repository` metadata:

```js
repository: { owner: 'owner', name: 'repository', defaultBranch: 'main' }
```

The Projects page search works with the existing category buttons. If a new category is introduced, add a matching `data-project-filter` button in `projects.html`.

## Add real screenshots

Do not add fake or placeholder screenshots. Create the directory documented by the project's `imageDirectory` (for example `images/my-project/`), add the real image files, then add entries to that project's `images` array:

```js
images: [
    {
        src: 'images/my-project/home.png',
        alt: 'The project home screen',
        caption: 'The project home screen.'
    }
]
```

Keep images compressed and use descriptive alt text. The gallery is only rendered when real entries exist.

## Add achievements and timeline entries

Edit `achievements.js`; the cards and timeline are generated from the same `achievements` array. Keep newest/current entries first, use verified facts only, and write `Current`, `Age 5`, `Age 7`, or `Date not recorded` when an exact date is unknown. Do not turn an unknown year into a guessed year.

## Current learning and music

Update the first-person copy in `now.html` for current learning. The music cards intentionally connect guitar, violin, and piano practice with patience, feedback, rhythm, and consistency without claiming that music caused a particular technical outcome.

## CV

`cv.html` has **Print / Save PDF** and **Download CV page** entry points. The repository does not contain a generated or fake PDF. To provide a real PDF:

1. Create or export the real document yourself.
2. Add it at a path such as `assets/ashvik-dubey-cv.pdf`.
3. Change the download link in `cv.html` from `cv.html` to that PDF path and keep the `download` attribute.

Update the visible CV copy whenever the underlying facts change.

## Contact and social links

The public contact email is `hi@ashvikdubey.com`. If it changes, replace the visible address consistently in `contact.html` and `contact.js`.

The existing GitHub, LinkedIn, and Instagram links are retained. Replace them only with accounts you control.

## Optional social metadata image

Open Graph tags and canonical URLs are present on the key pages. To add a social preview image, provide a real image such as `assets/social-card.png`, then add an absolute `og:image` tag (and matching `twitter:card` metadata if desired) to the page heads. No image is fabricated by this repository.

## Optional analytics (disabled by default)

`analytics.js` is loaded as a no-op configuration with `enabled: false`; it makes no network requests and adds no third-party tracker. If analytics is genuinely wanted:

1. Choose a privacy-respecting provider and review its consent/privacy requirements.
2. Set the provider and ID in `analytics.js` only after deciding what data is appropriate.
3. Add that provider's documented, consent-aware loader in the marked hook.
4. Update the site's privacy notice/content as required.

No analytics ID or provider is currently configured.

## Contact form

The contact form is configured for the Formspree endpoint `https://formspree.io/f/maykrkvd` and submits with the existing vanilla JavaScript `fetch` handler. Formspree receives the name, email, country, message, and subject fields. If the endpoint changes, update both the form `action` and `data-endpoint` in `contact.html`.

## Other notes

- `changelog.html` records the portfolio's current evolution without inventing dates; `CHANGELOG.md` mirrors the short release record for repository readers.
- `404.html` is the GitHub Pages fallback page.
- Quiz best scores remain local to the visitor's browser under `ashvik-binary-best` and `ashvik-sound-best`.
- The theme button cycles through light, dark, and system preference.
- The Projects page fetches the six most recently updated public, non-forked repositories from `kuturud` and shows language, updated date, stars, and forks when GitHub provides them.
- Replace `favicon.ico` whenever the site icon needs updating.
