const contactForm = document.querySelector('[data-contact-form]');
const contactStatus = document.querySelector('[data-contact-status]');
const formEndpoint = contactForm?.dataset.endpoint?.trim();

contactForm?.addEventListener('submit', async (event) => {
    if (!formEndpoint || formEndpoint.includes('REPLACE_WITH')) return;
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    if (contactStatus) contactStatus.textContent = 'Sending…';
    try {
        const response = await fetch(formEndpoint, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error(`Contact form returned ${response.status}`);
        contactForm.reset();
        if (contactStatus) contactStatus.textContent = 'Message sent. Thank you.';
    } catch (error) {
        console.error(error);
        if (contactStatus) contactStatus.textContent = 'Could not send this time. Please email hi@ashvikdubey.com directly.';
    } finally {
        submitButton.disabled = false;
    }
});
