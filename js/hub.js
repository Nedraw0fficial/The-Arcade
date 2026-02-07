// 🎮 RETRO ARCADE - HUB LOGIC
// Dynamically generates the game grid from the registry

class ArcadeHub {
    constructor() {
        this.gamesContainer = null;
        this.effects = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.gamesContainer = document.getElementById('games-grid');
        
        if (!this.gamesContainer) {
            console.error('Games grid container not found!');
            return;
        }

        // NO MORE WebGL effects - keeping it clean!
        // NO MORE particles - keeping it clean!

        // Add scan line effect
        this.addScanLine();

        // Generate game cards
        this.generateGameCards();

        // Add interactive effects
        this.addInteractiveEffects();

        // Animate entrance
        this.animateEntrance();
    }

    addScanLine() {
        // Just add the single scan line for subtle retro feel
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        document.body.appendChild(scanLine);
    }

    generateGameCards() {
        GAMES.forEach((game, index) => {
            const card = this.createGameCard(game, index);
            this.gamesContainer.appendChild(card);
        });
    }

    createGameCard(game, index) {
        const card = document.createElement('a');
        card.href = `game.html?id=${game.id}`;
        card.className = 'game-card';
        card.style.setProperty('--neon-color', game.color);
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="game-card-inner">
                <div class="game-card-glow"></div>
                ${isGameNew(game.releaseDate) ? '<div class="new-badge">NEW</div>' : ''}
                <div class="game-logo">
                    <img src="${game.logo}" alt="${game.title}">
                </div>
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-year">${game.year}</p>
                </div>
                <div class="scan-lines"></div>
            </div>
        `;

        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', () => {
            this.playHoverSound();
        });

        // Add click effect
        card.addEventListener('click', (e) => {
            this.playClickSound();
            this.transitionToGame(e, game);
        });

        return card;
    }

    addInteractiveEffects() {
        const cards = document.querySelectorAll('.game-card');
        
        cards.forEach(card => {
            // Parallax effect on mouse move
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                const logo = card.querySelector('.game-logo img');
                if (logo) {
                    logo.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                const logo = card.querySelector('.game-logo img');
                if (logo) {
                    logo.style.transform = 'translate(0, 0)';
                }
            });

            // Glitch effect on title
            const title = card.querySelector('.game-title');
            card.addEventListener('mouseenter', () => {
                if (Math.random() > 0.7) { // 30% chance of glitch
                    glitchEffect(title, 150);
                }
            });
        });
    }

    animateEntrance() {
        const title = document.querySelector('.arcade-title');
        if (title) {
            setTimeout(() => {
                glitchEffect(title, 500);
            }, 500);
        }
    }

    transitionToGame(e, game) {
        // Prevent default link behavior
        e.preventDefault();

        // Add screen wipe effect
        const wipe = document.createElement('div');
        wipe.className = 'screen-wipe';
        document.body.appendChild(wipe);

        // Navigate after animation
        setTimeout(() => {
            window.location.href = `game.html?id=${game.id}`;
        }, 500);
    }

    playHoverSound() {
        // Optional: Add a subtle beep sound
        // You can implement this with Web Audio API or load actual sound files
        if (window.audioContext) {
            const ctx = window.audioContext;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.05);
        }
    }

    playClickSound() {
        // Optional: Add a click/select sound
        if (window.audioContext) {
            const ctx = window.audioContext;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.value = 1200;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.1);
        }
    }
}

// Initialize audio context on first user interaction
document.addEventListener('click', function initAudio() {
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    document.removeEventListener('click', initAudio);
}, { once: true });

// Initialize the hub
const hub = new ArcadeHub();
