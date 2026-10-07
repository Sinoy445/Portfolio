/* Portfolio JavaScript */

document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Number the hero logos so CSS can fade them in and out one after another
    const heroLogos = document.querySelectorAll('.hero-logos .logos img');
    heroLogos.forEach((img, i) => img.style.setProperty('--i', i));
    const heroLogoBox = document.querySelector('.hero-logos');
    if (heroLogoBox) heroLogoBox.style.setProperty('--logo-count', heroLogos.length);

    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Form validation and submission (simple)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // No backend: open the visitor's email app with the message filled in
            const data = new FormData(contactForm);
            const subject = `Portfolio message from ${data.get('name')}`;
            const body = `${data.get('message')}\n\n${data.get('name')} (${data.get('email')})`;
            const status = document.getElementById('form-status');
            if (status) status.textContent = 'Opening your email app. If nothing opens, write to yr5549678@gmail.com directly.';
            window.location.href = `mailto:yr5549678@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optional: Add interactive skill bars or progress circles if needed
    // For now, we keep it static.

    // Optional: Lazy load images (if we had many)
    // Not needed for this portfolio.

    // Optional: Detect dark mode preference (already using dark background)
    // We could respect prefers-color-scheme, but we are fixed dark.

    // Optional: Add parallax or subtle animations on scroll
    // We'll keep it simple for performance.

    // Highlight the nav link of the section in view
    const navLinks = document.querySelectorAll('.site-nav ul a');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('#top, main section[id]').forEach((s) => io.observe(s));
    }
});