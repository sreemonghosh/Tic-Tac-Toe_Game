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

## 📁 Project Structure

```text
gridlock-tictactoe/
│
├── index.html                    # App markup (splash, menu, and game screens)
├── style.css                    # All styling, layout, and animations
├── script.js                    # Game logic, state management, and
│                                # minimax AI
│
├── assets/
│   └── logo.png                 # App logo / icon (used in splash screen
│                                # & README)
│
├── release/
│   └── gridlock-tictactoe.apk   # Installable Android build
│
└── README.md                    # You are here
```

## 🚀 Running It Locally (Web)

No installation or build tools required.

**Option 1 — Just open it:** Double-click `index.html`, or open it directly in any modern browser.

**Option 2 — Serve it locally** (recommended, avoids any local file/CORS quirks):

```bash
# Clone the repo
git clone https://github.com/sreemonghosh/gridlock-tictactoe.git
cd gridlock-tictactoe

# Serve with Python
python3 -m http.server 8000
# then open http://localhost:8000

# OR serve with Node
npx serve .
```

## 📱 Download the Android App

**A packaged Android build is included in this repository:-**    app-release.apk

**How to install**
Download the .apk file from the release/ folder above (or from the Releases page, if published there).
On your Android device, open the downloaded file.
If prompted, allow installation from this source **(Settings → Security → Install unknown apps)** — this is required by Android for any app installed outside the Play Store.
Tap **Install**, then open **GRIDLOCK** from your app drawer.

***⚠️ Note: This APK is unsigned/self-distributed and not published on the Google Play Store, so Android will show an "unknown source" warning — this is expected and safe for a personal/open-source project.***

**How the app is built**

The Android app is a WebView wrapper around this same HTML/CSS/JS project — it packages the web app so it runs as a standalone installable app with its own icon, splash behavior, and offline access, without rewriting any game logic natively. The web version above and the Android app are functionally identical.

## 🕹️ How to Play

1. Launch the app — the animated **GRIDLOCK** logo plays briefly on startup.
2. From the menu, choose a mode:
   - **Player vs Player** — starts immediately.
   - **Player vs Computer** — pick a difficulty (**Easy** or **Unbeatable**) before the round starts.
3. Player **X** always goes first. Tap/click any empty cell to place your mark.
4. The scoreboard at the top tracks wins for **X**, wins for **O (or Computer)**, and draws.
5. Use **New Round** to replay with the same scoreboard, or **Reset Score** to start a fresh match. ← **Menu** returns you to mode selection at any time.

## 🧠 How the Unbeatable AI Works

The "Unbeatable" difficulty uses the **minimax algorithm**, a classic decision-making technique from game theory:

- On every computer turn, the AI simulates **all possible remaining games** from the current board state, alternating between the computer trying to maximize its outcome and the human player trying to minimize it.
- Each simulated game is scored: a computer win scores positively, a human win scores negatively, and a draw scores zero — with faster wins/slower losses weighted slightly higher via move depth.
- The AI then picks the move that leads to the best guaranteed outcome, assuming the opponent also plays optimally.
- Because Tic Tac Toe is a "solved" game with a small search space (at most 9 moves), minimax can fully explore every possible game in milliseconds — which is why this difficulty **never loses**, and can only be drawn against with perfect play.

The **Easy** difficulty intentionally weakens this: most of the time it picks a random empty cell instead of running minimax, making it beatable while still occasionally playing a smart move.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Grid, keyframe animations, `prefers-reduced-motion` support) |
| Logic | Vanilla JavaScript (ES6+), no frameworks or libraries |
| AI | Minimax algorithm (implemented from scratch) |
| Fonts | Space Grotesk, Inter, JetBrains Mono — via Google Fonts |
| Android packaging | WebView app wrapper |

## 🌐 Deploying to GitHub Pages

You can host the web version for free directly from this repo:

1. Push this project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **"Build and deployment,"** set **Source** to **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder, then save.
5. Your game will be live at: `https://<your-username>.github.io/<repo-name>/`

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Ideas for future improvements: sound effects, online multiplayer, light/dark theme toggle, win-streak tracking, and custom board sizes.

## 📄 License

This project is released under the **MIT License** — free to use, modify, and distribute. See the `LICENSE` file for details (add one to the repo if it isn't present yet).
