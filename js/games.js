// 🎮 RETRO ARCADE - GAME REGISTRY
// Add your games here and they'll automatically appear on the main hub!

const GAMES = [
    {
        id: 'snake-deluxe',
        title: 'SNAKE',
        description: 'The classic snake game',
        logo: 'assets/games/snake-deluxe/logo.png',
        path: 'games/snake-deluxe/index.html',
        color: '#00ff00',
        year: 'February 7th, 2026',
        releaseDate: '2026-02-07'
    },
    {
        id: 'tetris',
        title: 'TETRIS',
        description: 'Classic block stacking puzzle',
        logo: 'assets/games/tetris/logo.png',
        path: 'games/tetris/index.html',
        color: '#00ffff',
        year: 'February 7th, 2026',
        releaseDate: '2026-02-07'
    },
    {
        id: 'pong',
        title: 'PONG',
        description: 'Classic paddle vs AI showdown',
        logo: 'assets/games/pong/logo.png',
        path: 'games/pong/index.html',
        color: '#bb00ff',
        year: 'February 7th, 2026',
        releaseDate: '2026-02-07'
    },
    {
        id: 'minesweeper',
        title: 'MINE SWEEPER',
        description: 'Clear the minefield without exploding',
        logo: 'assets/games/minesweeper/logo.png',
        path: 'games/minesweeper/index.html',
        color: '#eeff00',
        year: 'February 8th, 2026',
        releaseDate: '2026-02-08'
    },
    {
        id: '2048',
        title: '2048',
        description: 'Slide and combine tiles to reach 2048',
        logo: 'assets/games/2048/logo.png',
        path: 'games/2048/index.html',
        color: '#ff0d00',
        year: 'February 8th, 2026',
        releaseDate: '2026-02-08'
    },
    {
        id: 'space-invaders',
        title: 'SPACE INVADERS',
        description: 'Defend Earth from alien invaders',
        logo: 'assets/games/space-invaders/logo.png',
        path: 'games/space-invaders/indexV2-b.html',
        color: '#5d00ff',
        year: 'February 8th, 2026',
        releaseDate: '2026-02-08'
    },
    {
        id: 'bomberman',
        title: 'BOMBERMAN',
        description: 'Classic maze-based multiplayer action game',
        logo: 'assets/games/bomberman/logo.png',
        path: 'games/bomberman/index.html',
        color: '#ff00aa',
        year: 'February 12th, 2026',
        releaseDate: '2026-02-12'
    }
];
    // 🎯 ADD MORE GAMES HERE - Just copy the format above

function isGameNew(releaseDate) {
    if (!releaseDate) return false;
    
    const release = new Date(releaseDate);
    const now = new Date();
    const daysDiff = (now - release) / (1000 * 60 * 60 * 24);
    
    return daysDiff >= 0 && daysDiff <= 4; // changed tp 4 days to give a bit more time for the "New!" badge to show up
}

// Get game by ID
function getGameById(id) {
    return GAMES.find(game => game.id === id);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAMES, getGameById };
}
