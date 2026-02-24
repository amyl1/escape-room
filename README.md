# Escape Room - Final Challenge

A simple, mobile-friendly web app for the final challenge of an escape room. Players enter four numbers from clues and receive feedback on which digits are correct.

## Features

- ✅ Mobile-optimized interface
- 🎯 Real-time digit validation
- 📍 Shows exactly which digits are incorrect
- 🎉 Congratulations message for correct answer
- ⌨️ Auto-focuses to next input field
- Enter key support for submission

## Usage

Players need to enter the four-digit code from clues. The correct answer is **7184**.

### Feedback System
- **Incorrect digits**: Red highlight shows which positions need to be corrected
- **Correct digits**: Green highlight confirms correct entries
- **Success**: Shows congratulations message with instructions to collect prize

## Deployment to GitHub Pages

1. Create a new GitHub repository named `wtd-escape-room`
2. Push these files to the `main` branch:
   ```
   git add .
   git commit -m "Initial commit: Escape room final challenge"
   git push origin main
   ```
3. Go to repository Settings → Pages
4. Set the source to `main` branch and `/root` folder
5. Your app will be live at `https://yourusername.github.io/wtd-escape-room/`

## File Structure

```
wtd-escape-room/
├── index.html    # Main HTML file
├── styles.css    # Styling (mobile-optimized)
├── script.js     # Validation logic
└── README.md     # This file
```

## Customization

- **Change the answer**: Edit `CORRECT_CODE` in `script.js`
- **Modify styling**: Edit colors and fonts in `styles.css`
- **Update instructions**: Change text in `index.html`

## Browser Compatibility

Works on all modern browsers including:
- Chrome/Edge
- Firefox
- Safari
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

Ready to use on any phone at your escape room event! 🎮
