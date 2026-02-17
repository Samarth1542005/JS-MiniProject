# 🚀 JavaScript Mini Projects

A curated collection of interactive mini-projects built with vanilla **HTML**, **CSS**, and **JavaScript**. Each project demonstrates core front-end concepts with clean UI and smooth animations.

> 🔗 **[Live Demo](#)** — Click a project card on the landing page to explore!

---

## 📁 Project Structure

```
JS-MiniProject/
├── index.html          # Landing page with project cards
├── script.js           # Landing page interactions
├── style.css           # Landing page styles
├── README.md
├── Project 1/          # Color Changer
│   ├── index.html
│   └── script.js
├── Project 2/          # BMI Calculator
│   ├── index.html
│   ├── script.js
│   └── style.css
├── Project 3/          # World Time
│   ├── index.html
│   ├── index.js
│   └── style.css
└── Project 4/          # GitHub Profile Viewer
    ├── index.html
    ├── script.js
    ├── silk.js
    └── style.css
```

---

## 🎨 Project 1 — Color Changer

A simple yet visually satisfying app that lets you click on color blocks to instantly change the entire page background with a smooth transition.

### Features
- Four vibrant color options (Red, Green, Blue, Yellow)
- Smooth CSS background-color transitions
- Hover scale animation on color blocks
- Clean, centered layout with modern typography

### Technologies
| Tech | Usage |
|------|-------|
| **HTML** | Page structure and color blocks with `data-color` attributes |
| **CSS** | Inline styles, transitions, hover effects, Flexbox layout |
| **JavaScript** | DOM manipulation, `querySelectorAll`, event listeners, `dataset` API |
| **Google Fonts** | Poppins font family |

---

## ⚖️ Project 2 — BMI Calculator

A feature-rich Body Mass Index calculator with gender-specific thresholds, a dynamic visual BMI scale, and personalized health feedback.

### Features
- **Gender selection** with interactive male/female cards
- Height (cm) and Weight (kg) input fields
- **Gender-specific BMI thresholds** (different ranges for male & female)
- Animated **BMI scale bar** with a pointer that moves to your BMI position
- Color-coded categories: Underweight, Normal, Overweight, Obese
- **Personalized health feedback** with emojis based on gender and BMI range
- Keyboard support (Enter key to calculate)
- Glassmorphism UI with gradient background and backdrop blur

### Technologies
| Tech | Usage |
|------|-------|
| **HTML** | Semantic form structure, radio inputs for gender, result display sections |
| **CSS** | Glassmorphism (`backdrop-filter: blur`), gradient backgrounds, Flexbox, CSS animations (`fadeIn` keyframes), color-coded category badges |
| **JavaScript** | BMI formula calculation, DOM manipulation, conditional logic for gender-specific thresholds, dynamic pointer positioning, input validation |

---

## 🌍 Project 3 — World Time

A beautiful real-time world clock app displaying **analog + digital clocks** for 12 major cities across the globe, with a dark/light theme toggle.

### Features
- **12 city clocks**: New York, London, Paris, Dubai, Mumbai, Shanghai, Tokyo, Sydney, Los Angeles, São Paulo, Moscow, Singapore
- **Analog clock faces** with hour numbers, tick marks, and smooth continuously-moving hands
- **Digital time display** alongside each analog clock
- **Dark/Light theme toggle** with `localStorage` persistence
- Buttery-smooth animations using `requestAnimationFrame`
- Fully responsive grid layout

### Technologies
| Tech | Usage |
|------|-------|
| **HTML** | Semantic structure, dynamically generated clock cards |
| **CSS** | CSS custom properties (variables) for theming, CSS Grid (`auto-fit`), transitions, responsive media queries, absolute positioning for clock hands |
| **JavaScript** | `Intl.DateTimeFormat` API for timezone conversion, `requestAnimationFrame` for smooth clock animation, `localStorage` for theme persistence, dynamic DOM creation |

---

## 🔍 Project 4 — GitHub Profile Viewer

A sleek GitHub profile lookup app that fetches user data from the GitHub API and displays it in a beautifully designed card with a mesmerizing silk-like animated WebGL background.

### Features
- **Search by username** with a clean input field and search button
- Fetches real-time data from the **GitHub REST API** (`api.github.com`)
- Displays **avatar**, **name**, **username**, **bio**, **public repos**, **followers**, and **following**
- Direct **"View on GitHub"** link to the user's profile
- **Animated silk background** using a custom WebGL shader with layered simplex noise
- Keyboard support (Enter key to search)
- Graceful **error handling** for invalid or non-existent usernames
- Glassmorphism UI with backdrop blur, gradient text, and smooth `fadeIn` animations
- Fully responsive design with mobile-friendly layout

### Technologies
| Tech | Usage |
|------|-------|
| **HTML** | Semantic structure, search input, profile card layout with stats |
| **CSS** | Glassmorphism (`backdrop-filter: blur`), gradient text with `background-clip`, CSS animations (`fadeIn`, `containerIn`, `gradientShift`), Flexbox, responsive media queries |
| **JavaScript** | `fetch` API for GitHub REST API calls, `async/await`, DOM manipulation, error handling, event listeners |
| **WebGL (silk.js)** | Custom vertex & fragment shaders, simplex noise algorithm, layered noise for silk-like flowing animation, `requestAnimationFrame` rendering loop |
| **Google Fonts** | Inter font family |

---

## 🛠️ Technologies Overview

- **HTML5** — Semantic markup and structure
- **CSS3** — Flexbox, Grid, Transitions, Animations, Glassmorphism, CSS Variables
- **Vanilla JavaScript (ES6+)** — DOM manipulation, Event handling, Intl API, localStorage, requestAnimationFrame, Fetch API, async/await
- **WebGL** — Custom shaders, simplex noise, animated backgrounds
- **Google Fonts** — Inter (landing page & Project 4), Poppins (Project 1)

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Samarth1542005/JS-MiniProject.git
   ```
2. **Open `index.html`** in your browser to view the landing page
3. **Click on any project card** to explore that project

> No build tools or dependencies required — everything runs with vanilla HTML, CSS & JS!

---

## 📸 Screenshots

| Landing Page | Color Changer | BMI Calculator | World Time | GitHub Profile Viewer |
|:---:|:---:|:---:|:---:|:---:|
| 🏠 | 🎨 | ⚖️ | 🌍 | 🔍 |

---

## 📝 License

This project is open source and available for learning purposes.

---

Made with ❤️ by **Samarth Raut**
