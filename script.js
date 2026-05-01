/* ═══════════════════════════════════════════════════════════
   NAZMUL ISLAM — PORTFOLIO SCRIPT
   Includes: Three.js sphere, scroll animations, counter,
             typewriter, accordion, skills filter, navbar
═══════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────
   1. THREE.JS — HERO WIREFRAME SPHERE
────────────────────────────────────── */
(function initThreeSphere() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 4.5);

    // Outer icosahedron wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 3);
    const outerMat = new THREE.MeshBasicMaterial({
        color: 0x6c63ff,
        wireframe: true,
        transparent: true,
        opacity: 0.10
    });
    const outerSphere = new THREE.Mesh(outerGeo, outerMat);

    // Inner icosahedron wireframe
    const innerGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const innerMat = new THREE.MeshBasicMaterial({
        color: 0x4f8ef7,
        wireframe: true,
        transparent: true,
        opacity: 0.07
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);

    // Orbit ring
    const ringGeo = new THREE.TorusGeometry(2.5, 0.004, 2, 100);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x6c63ff,
        transparent: true,
        opacity: 0.13
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3.5;

    // Floating particles
    const pCount = 100;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = 2.2 + Math.random() * 1.3;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
        color: 0x6c63ff,
        size: 0.03,
        transparent: true,
        opacity: 0.45
    });
    const particles = new THREE.Points(pGeo, pMat);

    // Offset all to right side of screen
    const offsetX = window.innerWidth > 768 ? 3.0 : 0;
    [outerSphere, innerSphere, ring, particles].forEach(obj => {
        obj.position.x = offsetX;
        scene.add(obj);
    });

    let t = 0;
    function animate() {
        requestAnimationFrame(animate);
        t += 0.005;
        outerSphere.rotation.x = t * 0.28;
        outerSphere.rotation.y = t * 0.48;
        innerSphere.rotation.x = -t * 0.38;
        innerSphere.rotation.y = t * 0.30;
        ring.rotation.z = t * 0.18;
        particles.rotation.y = t * 0.09;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const newOffset = w > 768 ? 3.0 : 0;
        [outerSphere, innerSphere, ring, particles].forEach(obj => {
            obj.position.x = newOffset;
        });
    });
})();


/* ──────────────────────────────────────
   2. NAVBAR — STICKY + SCROLL EFFECT
────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ──────────────────────────────────────
   3. MOBILE MENU
────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const mobileOverlay = document.getElementById('mobile-overlay');

function toggleMobileMenu() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    mobileOverlay.classList.toggle('visible', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    mobileOverlay.classList.remove('visible');
    document.body.style.overflow = '';
}

// Close menu on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
});


/* ──────────────────────────────────────
   4. SCROLL FADE-UP ANIMATIONS
────────────────────────────────────── */
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


/* ──────────────────────────────────────
   5. COUNTER ANIMATION
────────────────────────────────────── */
function animateCounter(el, targetVal) {
    const suffix = el.querySelector('span') ? el.querySelector('span').textContent : '';
    const duration = 1400; // ms
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.round(eased * targetVal);

        // Replace text node only (keep <span> child)
        const textNode = el.childNodes[0];
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            textNode.textContent = current;
        } else {
            el.insertBefore(document.createTextNode(current), el.firstChild);
        }

        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('[data-count]').forEach(el => {
                    animateCounter(el, parseInt(el.dataset.count, 10));
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}


/* ──────────────────────────────────────
   6. TYPEWRITER — ROLE TITLES
────────────────────────────────────── */
const roles = [
    'MERN Stack Developer',
    'React.js Developer',
    'Node.js Backend Dev',
    'Full Stack Web Dev',
    'Frontend Specialist'
];

const twEl = document.getElementById('typewriter-role');
if (twEl) {
    twEl.classList.add('typewriter');
    let roleIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    const TYPING_SPEED = 72;   // ms per char
    const DELETING_SPEED = 36;   // ms per char
    const PAUSE_AFTER = 2400; // ms pause after full word

    function typeLoop() {
        const currentRole = roles[roleIndex];

        if (isTyping) {
            if (charIndex < currentRole.length) {
                twEl.textContent = currentRole.substring(0, ++charIndex);
                setTimeout(typeLoop, TYPING_SPEED);
            } else {
                setTimeout(() => { isTyping = false; typeLoop(); }, PAUSE_AFTER);
            }
        } else {
            if (charIndex > 0) {
                twEl.textContent = currentRole.substring(0, --charIndex);
                setTimeout(typeLoop, DELETING_SPEED);
            } else {
                roleIndex = (roleIndex + 1) % roles.length;
                isTyping = true;
                setTimeout(typeLoop, 400);
            }
        }
    }
    typeLoop();
}


/* ──────────────────────────────────────
   7. ACCORDION / FAQ
────────────────────────────────────── */
function toggleAccordion(headerBtn) {
    const item = headerBtn.closest('.accordion-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));

    // Open clicked if it was closed
    if (!isOpen) item.classList.add('open');
}


/* ──────────────────────────────────────
   8. SKILLS FILTER
────────────────────────────────────── */
const skillsData = [
    // Frontend
    { name: 'HTML5', icon: '🌐', cat: 'frontend' },
    { name: 'CSS3', icon: '🎨', cat: 'frontend' },
    { name: 'Tailwind CSS', icon: '🌊', cat: 'frontend' },
    { name: 'JavaScript', icon: '⚡', cat: 'frontend' },
    { name: 'React.js', icon: '⚛️', cat: 'frontend' },
    { name: 'React Router', icon: '🔀', cat: 'frontend' },
    { name: 'React Query', icon: '🔄', cat: 'frontend' },
    // Backend
    { name: 'Node.js', icon: '🟩', cat: 'backend' },
    { name: 'Express.js', icon: '🚂', cat: 'backend' },
    { name: 'MongoDB', icon: '🍃', cat: 'backend' },
    { name: 'REST API', icon: '🔌', cat: 'backend' },
    { name: 'Firebase', icon: '🔥', cat: 'backend' },
    { name: 'JWT Auth', icon: '🔐', cat: 'backend' },
    // Tools
    { name: 'Git', icon: '📌', cat: 'tools' },
    { name: 'GitHub', icon: '🐙', cat: 'tools' },
    { name: 'VS Code', icon: '💻', cat: 'tools' },
    { name: 'Postman', icon: '📮', cat: 'tools' },
    { name: 'Vercel', icon: '▲', cat: 'tools' },
    { name: 'Figma', icon: '🖼️', cat: 'tools' },
];

let activeSkillCat = 'all';

function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    const filtered = activeSkillCat === 'all'
        ? skillsData
        : skillsData.filter(s => s.cat === activeSkillCat);

    grid.innerHTML = filtered.map(skill => `
    <div class="skill-item fade-up visible">
      <div class="skill-icon">${skill.icon}</div>
      <div class="skill-name">${skill.name}</div>
    </div>
  `).join('');
}

function filterSkills(cat, btn) {
    activeSkillCat = cat;
    document.querySelectorAll('.skills-toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSkills();
}

// Initial render
renderSkills();


/* ──────────────────────────────────────
   9. SMOOTH SCROLL FOR ANCHOR LINKS
────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});


/* ──────────────────────────────────────
   10. ACTIVE NAV LINK ON SCROLL
────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');

const navHighlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = link.getAttribute('href') === `#${id}`
                    ? 'var(--text)'
                    : '';
            });
        }
    });
}, {
    threshold: 0.35,
    rootMargin: '-70px 0px -30% 0px'
});

sections.forEach(s => navHighlightObserver.observe(s));


/* ──────────────────────────────────────
   11. YEAR WATERMARK PARALLAX (subtle)
────────────────────────────────────── */
const watermark = document.querySelector('.exp-bg-year');
if (watermark) {
    window.addEventListener('scroll', () => {
        const rect = watermark.closest('section').getBoundingClientRect();
        const progress = -rect.top / (rect.height || 1);
        watermark.style.transform = `translateY(calc(-50% + ${progress * 40}px))`;
    }, { passive: true });
}


/* ──────────────────────────────────────
   12. CARD TILT EFFECT (subtle, desktop)
────────────────────────────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.proj-card, .pshowcase-card, .edu-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = -(e.clientY - centerY) / rect.height * 6;
            const rotateY = (e.clientX - centerX) / rect.width * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}


/* ──────────────────────────────────────
   13. PAGE LOAD — INITIAL VISIBILITY
────────────────────────────────────── */
window.addEventListener('load', () => {
    // Trigger hero animations immediately
    document.querySelectorAll('#hero .fade-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
    });
});