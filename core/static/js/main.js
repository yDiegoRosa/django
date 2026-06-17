/**
 * Django 1.0 — Interactive Animations
 * Scroll reveals, cursor glow, ripple clicks, tilt cards, navbar effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCursorGlow();
    initRippleEffect();
    initCardTilt();
    initNavbarScroll();
    initCounterAnimation();
    initTableRowInteraction();
    initSmoothPageTransition();
});

/* ===== 1. SCROLL REVEAL ===== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.hero, .section-header, .table-wrapper, .detail-card, .contact-card, .contact-item, .stat-card'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

/* ===== 2. CURSOR GLOW TRAIL ===== */
function initCursorGlow() {
    // Only on desktop
    if (window.matchMedia('(hover: none)').matches) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

/* ===== 3. RIPPLE EFFECT ON CLICKS ===== */
function initRippleEffect() {
    const rippleTargets = document.querySelectorAll(
        '.navbar-links a, .back-btn, .product-name-link, .contact-item'
    );

    rippleTargets.forEach(target => {
        target.style.position = 'relative';
        target.style.overflow = 'hidden';

        target.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
}

/* ===== 4. CARD TILT ON HOVER (3D) ===== */
function initCardTilt() {
    if (window.matchMedia('(hover: none)').matches) return;

    const tiltCards = document.querySelectorAll('.stat-card, .contact-item');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
    });
}

/* ===== 5. NAVBAR SHRINK ON SCROLL ===== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.scrollY;

                if (currentScroll > 60) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }

                // Hide/show on scroll direction
                if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ===== 6. ANIMATED COUNTERS ===== */
function initCounterAnimation() {
    const priceElements = document.querySelectorAll('.stat-card .value.price');
    const amountElements = document.querySelectorAll('.stat-card .value.amount');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();

                if (el.classList.contains('price')) {
                    // Animate price: "R$ 123.45" → counter
                    const match = text.match(/R\$\s*([\d.,]+)/);
                    if (match) {
                        const target = parseFloat(match[1].replace(',', '.'));
                        animateNumber(el, 0, target, 800, (v) => `R$ ${v.toFixed(2)}`);
                    }
                } else if (el.classList.contains('amount')) {
                    // Animate integer
                    const target = parseInt(el.textContent);
                    if (!isNaN(target)) {
                        animateNumber(el, 0, target, 600, (v) => Math.round(v).toString());
                    }
                }

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    priceElements.forEach(el => observer.observe(el));
    amountElements.forEach(el => observer.observe(el));
}

function animateNumber(element, start, end, duration, formatter) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;

        element.textContent = formatter(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ===== 7. TABLE ROW HOVER GLOW ===== */
function initTableRowInteraction() {
    const rows = document.querySelectorAll('.products-table tbody tr');

    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            rows.forEach(r => {
                if (r !== row) r.style.opacity = '0.5';
            });
        });

        row.addEventListener('mouseleave', () => {
            rows.forEach(r => r.style.opacity = '1');
        });
    });
}

/* ===== 8. SMOOTH PAGE TRANSITIONS ===== */
function initSmoothPageTransition() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"])');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            document.body.classList.add('page-exit');

            setTimeout(() => {
                window.location.href = href;
            }, 250);
        });
    });

    // Fade in on load
    document.body.classList.add('page-enter');
    requestAnimationFrame(() => {
        document.body.classList.add('page-enter-active');
    });
}
