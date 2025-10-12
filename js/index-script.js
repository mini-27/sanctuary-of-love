// Sanctuary of Love - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // 🎬 Initialize elements
    const pageTransition = document.getElementById('pageTransition');
    const doorContainer = document.getElementById('doorContainer');
    const leftDust = document.getElementById('leftDust');
    const rightDust = document.getElementById('rightDust');
    const enterBtn = document.getElementById('enterBtn');

    // Set initial state
    document.body.classList.add('loaded');

    // 🌟 Create dust particles
    const createMagicDust = (container, count = 15) => {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const dust = document.createElement('div');
            dust.className = 'dust';
            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 4;
            const scale = 0.5 + Math.random() * 0.5;

            Object.assign(dust.style, {
                width: size + 'px',
                height: size + 'px',
                left: posX + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${duration}s linear infinite ${delay}s`,
                transform: `scale(${scale})`
            });
            fragment.appendChild(dust);
        }
        container.appendChild(fragment);
    };

    // ✨ Initialize dust effects
    createMagicDust(leftDust, 15);
    createMagicDust(rightDust, 15);

    // 🚪 Door behavior
    if (doorContainer) {
        if (window.innerWidth > 768) {
            // Desktop → open door only on hover
            doorContainer.addEventListener('mouseenter', () => {
                doorContainer.classList.add('door-open');
            });
            doorContainer.addEventListener('mouseleave', () => {
                doorContainer.classList.remove('door-open');
            });
        } else {
            // Mobile → open door automatically after delay
            setTimeout(() => {
                doorContainer.classList.add('mobile-auto-open');
            }, 2000);
        }
    }

    // 💫 Enter button transition
    if (enterBtn) {
        enterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (pageTransition) {
                pageTransition.classList.remove('hidden');
            }
            setTimeout(() => {
                window.location.href = 'sanctuary_of_love.html';
            }, 1000);
        });
    }

    // ⏸ Pause animations when tab not visible
    document.addEventListener('visibilitychange', () => {
        document.body.style.animationPlayState =
            document.visibilityState === 'visible' ? 'running' : 'paused';
    });

    // 🖼️ Preload background image
    const preloadImage = new Image();
    preloadImage.src = 'https://i.pinimg.com/736x/a9/98/39/a99839767ce04768cf083b5b6cca5dd9.jpg';


    // 🎵 Background music control
    const audio = document.getElementById("backgroundAudio");
    const audioToggle = document.getElementById("audioToggle");
    const audioIcon = document.getElementById("audioIcon");
    let isPlaying = false;
    audio.volume = 0.5;

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
