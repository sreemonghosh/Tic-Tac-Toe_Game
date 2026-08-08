# Tic Tac Toe Game

![tic-tac-toe-game_logo](https://github.com/sreemonghosh/Tic-Tac-Toe_Game/blob/4ac18f04647e43dc786d922d8441c3eb5db57ff5/tic-tac-toe.png)

## 📖 About
**GRIDLOCK** is a from-scratch reimagining of classic Tic Tac Toe with a modern, dark, neon-accented interface. It opens with an animated logo splash screen, drops you into a clean mode-selection menu, and features a fully working **Player vs Player** mode and a **Player vs Computer** mode with two difficulty levels — including a genuinely unbeatable AI powered by the minimax algorithm.

The game is a single lightweight front-end project (no backend, no database, no external JS frameworks) that runs entirely in the browser, and is also packaged as a standalone **Android APK** so it can be installed and played like a native app.

## ✨ Features
- **Animated splash screen** — the logo draws itself in with SVG stroke animation before transitioning into the app
- **Two game modes:**
👥 **Player vs Player** — pass-and-play on one device
🤖 **Player vs Computer** — play against the machine
- **Two AI difficulty levels:**
**Easy** — mostly randomized moves, beatable and casual
**Unbeatable** — full minimax search; it will never lose, at best you can force a draw
- **Live scoreboard** — tracks X wins, O wins, and draws for the whole session, with the active player's turn visually highlighted
- **Smooth animations** — marks pop in with a spring animation, winning lines are highlighted, screen transitions fade smoothly
- **Fully responsive** — scales cleanly from desktop down to small mobile screens
- **Accessibility-aware** — respects the prefers-reduced-motion system setting
- **Zero dependencies** — no npm install, no build step, no frameworks; just open the HTML file
- **Android app** — the same game wrapped as an installable .apk for Android devices

gridlock-tictactoe/
├── index.html                    # App markup (splash, menu, game screens)
├── style.css                     # All styling, layout, and animations
├── script.js                     # Game logic, state management, and minimax AI
├── assets/
│   └── logo.png                  # App logo / icon (used in splash screen & README)
├── release/
│   └── gridlock-tictactoe.apk    # Installable Android build
└── README.md                     # You are here
