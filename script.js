// Sanctuary of Love - Letters Page Main JS

document.addEventListener('DOMContentLoaded', function () {
    // Fade in body
    document.body.classList.add('loaded');

    // Magic dust
    const dustContainer = document.getElementById('dustContainer');
    if (dustContainer) {
        createMagicDust(dustContainer, 30);
    }

    // Animate cards
    initializeCards();

    // Hide page transition after load
    const transition = document.getElementById('pageTransition');
    setTimeout(() => {
        if (transition) transition.classList.add('hidden');
    }, 2200);

    // Attach fade-out transition to links
    document.querySelectorAll('a[href]').forEach(link => {
        if (!link.href.includes('#')) {
            link.addEventListener('click', e => {
                e.preventDefault();
                handlePageTransition(link.href);
            });
        }
    });
});

function createMagicDust(container, count = 20) {
    for (let i = 0; i < count; i++) {
        const dust = document.createElement('div');
        dust.className = 'dust';
        const size = Math.random() * 4 + 1;
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        dust.style.left = `${Math.random() * 100}%`;
        dust.style.top = `${Math.random() * 100}%`;
        dust.style.animation = `glow ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
        dust.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(dust);
    }
}

function initializeCards() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    cards.forEach(card => observer.observe(card));
}

function handlePageTransition(targetUrl) {
    const transition = document.getElementById('pageTransition');
    if (transition) transition.classList.remove('hidden');
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 1800);
}

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Focus on header for accessibility
        const header = document.querySelector('header');
        if (header) {
            header.setAttribute('tabindex', '-1');
            header.focus();
        }
    });
}

// 🎵 Background music control
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById("backgroundAudio");
    const audioToggle = document.getElementById("audioToggle");
    const audioIcon = document.getElementById("audioIcon");
    let isPlaying = false;
    audio.volume = 1.0;

    function playMusicOnce() {
        audio.play().then(() => {
            isPlaying = true;
            audioIcon.classList.remove("fi-ss-music-slash");
            audioIcon.classList.add("fi-ss-music");
            removeStartListeners(); // remove the listeners after first play
        }).catch(() => { });
    }

    function removeStartListeners() {
        window.removeEventListener("click", playMusicOnce);
        window.removeEventListener("touchstart", playMusicOnce);
        window.removeEventListener("mousemove", playMusicOnce);
    }

    // Try to start music after *any* interaction
    window.addEventListener("click", playMusicOnce);
    window.addEventListener("touchstart", playMusicOnce);
    window.addEventListener("mousemove", playMusicOnce);

    // Toggle mute/unmute manually
    audioToggle.addEventListener("click", () => {
        if (isPlaying && !audio.paused) {
            audio.pause();
            isPlaying = false;
            audioIcon.classList.remove("fi-ss-music");
            audioIcon.classList.add("fi-ss-music-slash");
            audioIcon.classList.add("audio-muted");
        } else {
            audio.play();
            isPlaying = true;
            audioIcon.classList.remove("fi-ss-music-slash");
            audioIcon.classList.add("fi-ss-music");
            audioIcon.classList.remove("audio-muted");
        }
    });
});

