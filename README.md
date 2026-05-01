# 🌐 Nazmul Islam — Personal Portfolio Website

A dark-themed, fully responsive personal portfolio website for **Nazmul Islam**, a MERN Stack Web Developer from Dhaka, Bangladesh. Built with pure **HTML, CSS, and Vanilla JavaScript** — no frameworks, no build tools, zero dependencies except Three.js for the hero animation.

---

## 📁 Project Structure

```
portfolio/
│
├── index.html          # Main HTML file — all sections & content
├── styles.css          # All styles — layout, animations, responsive
├── script.js           # All JavaScript — Three.js, interactions, effects
│
├── images/             # ← Create this folder for project screenshots
│   ├── matchmingle.jpg       (1280×720px recommended)
│   ├── surplussavour.jpg     (1280×720px recommended)
│   └── bistroboss.jpg        (1280×720px recommended)
│
└── README.md           # This file
```

---

## 🚀 Getting Started

### Option 1 — Open Locally
No installation required. Just open the file in your browser:
```
Double-click index.html
```
Or drag and drop `index.html` into any browser window.

### Option 2 — Live Server (Recommended for Development)
If you have VS Code, install the **Live Server** extension:
1. Right-click `index.html`
2. Click **"Open with Live Server"**
3. Your browser will open at `http://127.0.0.1:5500`

---

## 🌍 Deployment

### Deploy to GitHub Pages (Free)
1. Create a new GitHub repository (e.g. `nazmulislam-portfolio`)
2. Upload all files to the repo
3. Go to **Settings → Pages**
4. Set Source to `main` branch, folder `/root`
5. Click **Save**
6. Your site will be live at:
   ```
   https://yourusername.github.io/nazmulislam-portfolio
   ```

### Deploy to Vercel (Free, Fastest)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your portfolio repository
4. Click **Deploy** — done in under 30 seconds
5. You'll get a live URL like `https://nazmulislam.vercel.app`

### Deploy to Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your entire project **folder** onto the Netlify dashboard
3. It goes live instantly with a URL like `https://nazmulislam.netlify.app`

> **Custom Domain:** On all three platforms above, you can connect your own domain (e.g. `nazmulislam.dev`) from the platform's domain settings.

---

## 🖼️ Adding Project Screenshots

Project cards currently show emoji placeholders. To replace them with real screenshots:

### Step 1 — Take Screenshots
- Open each project's live URL in a browser
- Take a full-page or above-the-fold screenshot
- **Recommended size:** `1280×720px` (16:9 ratio)
- **Format:** `.jpg` or `.webp` (smaller file size, faster load)

### Step 2 — Save to Images Folder
Create an `images/` folder in the project root and save your files:
```
images/matchmingle.jpg
images/surplussavour.jpg
images/bistroboss.jpg
```

### Step 3 — Replace in index.html
Find each project card's image block. It looks like this:
```html
<div class="pshowcase-img" style="background:...">
  <span>💍</span>
  <div class="img-placeholder-hint">Replace with 1280×720 screenshot</div>
</div>
```
Replace the entire `<div class="pshowcase-img">` block with:
```html
<img src="images/matchmingle.jpg" alt="MatchMingle Screenshot" class="pshowcase-screenshot">
```
Repeat for all 3 projects.

---

## 🔗 Links to Update

Search for `href="#"` in `index.html` and replace with your real URLs:

| Location | Placeholder | Replace With |
|---|---|---|
| Navbar CTA | `#cta` | Already correct ✓ |
| Hero — View My Work | `#projects` | Already correct ✓ |
| MatchMingle — Live Demo | `#` | Your live site URL |
| MatchMingle — Front-End | `#` | GitHub repo URL |
| MatchMingle — Back-End | `#` | GitHub repo URL |
| Surplus Savour — Live Demo | `#` | Your live site URL |
| Surplus Savour — Front-End | `#` | GitHub repo URL |
| Surplus Savour — Back-End | `#` | GitHub repo URL |
| Bistro Boss — Live Demo | `#` | Your live site URL |
| Bistro Boss — Front-End | `#` | GitHub repo URL |
| Bistro Boss — Back-End | `#` | GitHub repo URL |
| LinkedIn icon | `#` | `https://linkedin.com/in/your-profile` |
| Download CV button | `#` | Path to your PDF CV file |
| Programming Hero Certificate | `#` | Certificate URL if available |

---

## 🛠️ Customisation Guide

### Change Your Name or Title
In `index.html`, search for `Nazmul Islam` and update wherever it appears.

### Change Accent Colors
In `styles.css`, find the `:root` block at the top:
```css
:root {
  --accent:  #6c63ff;   /* Purple — change to any color */
  --accent2: #4f8ef7;   /* Blue   — change to any color */
}
```

### Add Your Real Profile Photo
In `index.html`, find the about section's image frame:
```html
<div class="about-img-frame">
  <div class="about-avatar-placeholder">
    <span class="avatar-initials">NI</span>
    <div class="avatar-ring"></div>
  </div>
</div>
```
Replace with:
```html
<div class="about-img-frame" style="padding:0; overflow:hidden;">
  <img src="images/profile.jpg" alt="Nazmul Islam" style="width:100%;height:100%;object-fit:cover;">
</div>
```

### Update Stats in Hero Section
In `index.html`, find the hero stats block and update the `data-count` values:
```html
<div class="stat-num" data-count="15"><span>+</span></div>
```
Change `15` to your actual number of projects.

### Add More Projects
Copy any `.pshowcase-card` block in the Projects section and update the content inside.

---

## ✨ Features

| Feature | Details |
|---|---|
| **3D Hero Animation** | Three.js wireframe icosahedron sphere with floating particles |
| **Typewriter Effect** | Cycles through MERN Stack role titles automatically |
| **Scroll Animations** | Fade + slide-up on every section as you scroll |
| **Counter Animation** | Numbers count up when hero stats come into view |
| **Infinite Marquee Skills** | Two rows — one scrolls left, one scrolls right |
| **Sticky Navbar** | Transparent at top, frosted glass blur on scroll |
| **Mobile Menu** | Slide-in side drawer with overlay |
| **Accordion FAQ** | Smooth expand/collapse with rotation arrow |
| **Card Tilt Effect** | Subtle 3D perspective tilt on project cards (desktop only) |
| **Fully Responsive** | Works on all screens from 320px to 4K |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 1024px` | Full desktop layout, floating code cards visible |
| `≤ 1024px` | Tablet — single column about/community, code cards hidden |
| `≤ 768px` | Mobile — hamburger menu, all grids go single column |
| `≤ 480px` | Small phones — stacked buttons, tighter spacing |

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, animations, glassmorphism, responsive layout |
| Vanilla JavaScript | Interactions, scroll effects, counters, typewriter |
| Three.js (r128) | Hero section 3D wireframe sphere animation |
| Google Fonts | Syne (headings), DM Sans (body), JetBrains Mono (code) |

---

## 📬 Contact

**Nazmul Islam**
- 📧 ni.tamim95@yahoo.com
- 📱 +880 174 887 2670
- 📍 Dakhinkhan, Dhaka, Bangladesh
- 🐙 [github.com/N-Tamim95](https://github.com/N-Tamim95)

---

## 📄 License

This project is personal portfolio work. You are welcome to use it as a reference or starting point for your own portfolio — but please update all personal information, content, and branding before publishing.

---

*Built with ❤️ from Dhaka, Bangladesh.*