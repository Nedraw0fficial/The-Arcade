# 🎮 RETRO ARCADE - Game Library

A beautiful retro-styled game library with VHS effects, CRT aesthetics, neon glows, and authentic arcade vibes.

## ✨ Features

- **Dynamic Game Registry**: Add games by simply editing one file
- **Retro Effects**: VHS distortion, CRT scanlines, film grain, chromatic aberration
- **Neon Aesthetics**: Glowing borders, pulsing effects, synthwave vibes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Transitions**: Page transitions with screen wipe effects
- **Interactive Hover Effects**: Parallax movement, glitch text, sound effects
- **Modular Structure**: Easy to maintain and expand

## 🚀 Quick Start

1. **Clone/Download** this repository
2. **Open** `index.html` in your browser
3. **Add your games** (see below)

## 🎯 How to Add a Game

### Step 1: Add Your Game Files

Create a folder for your game in the `games/` directory:

```
games/
  └── your-game-name/
      └── index.html  (your game entry point)
```

### Step 2: Add Game Logo

Place your game's logo in `assets/games/your-game-name/`:

```
assets/
  └── games/
      └── your-game-name/
          └── logo.png
```

**Logo Guidelines:**
- Square format (recommended: 400x400px)
- PNG with transparent background
- Simple, bold design that works at small sizes

### Step 3: Register Your Game

Open `js/games.js` and add your game to the `GAMES` array:

```javascript
{
    id: 'your-game-name',           // Unique ID (URL-friendly)
    title: 'YOUR GAME TITLE',       // Display name
    description: 'Game description', // Short description
    logo: 'assets/games/your-game-name/logo.png',  // Path to logo
    path: 'games/your-game-name/index.html',       // Path to game
    color: '#ff00ff',               // Neon accent color (hex)
    year: '2024'                    // Release year
}
```

**That's it!** Your game will automatically appear on the main hub page.

## 🎨 Customization

### Change Colors

Edit the CSS variables in `css/main.css`:

```css
:root {
    --neon-pink: #ff00ff;
    --neon-cyan: #00ffff;
    --neon-green: #00ff00;
    --dark-bg: #0a0a0f;
}
```

### Adjust Effects

Modify the WebGL shaders in `js/effects.js` for different visual effects:
- VHS distortion intensity
- Scanline density
- Film grain amount
- Color shift effects

### Card Layout

Change the grid in `css/main.css`:

```css
.games-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 40px;
}
```

## 📁 Project Structure

```
retro-arcade/
├── index.html              # Main hub page
├── game.html               # Game display template
├── css/
│   └── main.css           # All styles and effects
├── js/
│   ├── games.js           # Game registry (ADD GAMES HERE)
│   ├── effects.js         # WebGL visual effects
│   └── hub.js             # Main hub logic
├── games/
│   └── [your-games]/      # Individual game folders
├── assets/
│   └── games/
│       └── [game-assets]/ # Game logos and assets
└── README.md              # This file
```

## 🎮 Example Game Structure

Each game should be self-contained in its own folder:

```
games/pixel-runner/
├── index.html       # Game entry point
├── game.js          # Game logic
├── style.css        # Game styles
└── assets/          # Game-specific assets
    ├── sprites/
    └── sounds/
```

## 🌟 Tips for Best Results

1. **Keep games self-contained**: All game assets should be in the game's folder
2. **Use relative paths**: Make sure your game works when loaded in an iframe
3. **Test responsiveness**: Games should work on different screen sizes
4. **Optimize images**: Compress logos and sprites for faster loading
5. **Match the aesthetic**: Use retro fonts and pixel art when possible

## 🎨 Design Guidelines

### Logos
- Simple, iconic designs work best
- Use bold, high-contrast colors
- Consider the neon glow effect in your design
- Test how it looks at different sizes

### Neon Colors
Popular choices that fit the aesthetic:
- Magenta/Pink: `#ff00ff`, `#ff006e`
- Cyan/Blue: `#00ffff`, `#00d9ff`
- Green: `#00ff00`, `#39ff14`
- Yellow: `#ffff00`, `#fff700`
- Purple: `#9d00ff`, `#bf00ff`

## 🔧 Troubleshooting

**Game not appearing?**
- Check that the game ID is unique
- Verify the file paths are correct
- Make sure logo image exists
- Check browser console for errors

**Effects not working?**
- Ensure WebGL is supported in your browser
- Check that JavaScript is enabled
- Look for console errors

**Styling issues?**
- Clear browser cache
- Verify CSS file is loading
- Check for conflicting styles

## 🚀 Deployment

### GitHub Pages
1. Push your repo to GitHub
2. Go to Settings → Pages
3. Select main branch
4. Your arcade will be live at `username.github.io/repo-name`

### Other Hosts
Simply upload all files to your web host. No build process required!

## 📝 License

Feel free to use this for your own game library! Customize it, improve it, make it your own.

## 🎯 Future Ideas

- [ ] Game categories/filters
- [ ] Search functionality
- [ ] Favorites system
- [ ] High score tracking
- [ ] Multiplayer lobby
- [ ] Game ratings
- [ ] Full-screen mode for games
- [ ] Keyboard shortcuts
- [ ] More visual effects (particle systems, etc.)

---

**Made with 💜 and lots of neon**

Enjoy building your retro arcade! 🕹️✨
