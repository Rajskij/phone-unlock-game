# 🔒 Unlock the Phone - Number Guessing Game

**Live Demo:** <a href="https://phone-unlock-game.netlify.app/" target="_blank">Unlock the phone</a>

A fun web-based game where players guess a secret number (0-100) to "unlock" a phone. Built with HTML, CSS, and vanilla JavaScript.

## 🎮 How to Play
1. **Enter your name** (must be 3+ characters)
2. **Guess the passcode** using the on-screen keypad
   - You get 7 attempts
   - Hints show if your guess is higher/lower than the secret number
3. **Win** by guessing correctly to reveal a hidden image
4. **Lose** after 7 wrong guesses (phone locks!)

## 🛠️ Features
- Mobile-responsive design
- Local storage for player names
- Dynamic hint system
- Win/loss animations
- One-click game restart


## ⚙️ Technical Details
- **Random Number Generation**: `Math.floor(Math.random() * 101)`
- **DOM Manipulation**: Event delegation for keypad buttons
- **Validation**:
  - Player name (3+ chars)
  - Number input (0-100 range)

---

*Created with pure JavaScript - no frameworks used!*
