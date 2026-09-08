/*
 * Privacy-friendly analytics hook.
 *
 * It is deliberately disabled. If I later choose a provider, I can set
 * enabled to true and add that provider's documented, consent-aware loader
 * here. No third-party analytics is requested or loaded by default.
 */
window.portfolioAnalytics = window.portfolioAnalytics || {
    enabled: false,
    provider: '',
    id: ''
};
