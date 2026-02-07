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
];
    // 🎯 ADD MORE GAMES HERE - Just copy the format above

function isGameNew(releaseDate) {
    if (!releaseDate) return false;
    
    const release = new Date(releaseDate);
    const now = new Date();
    const daysDiff = (now - release) / (1000 * 60 * 60 * 24);
    
    return daysDiff >= 0 && daysDiff <= 7;
}

// Get game by ID
function getGameById(id) {
    return GAMES.find(game => game.id === id);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAMES, getGameById };
}
