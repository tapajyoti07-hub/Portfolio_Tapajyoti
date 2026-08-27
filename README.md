# 🚀 Tapajyoti Nath — Personal Developer Portfolio

A modern, premium, and fully functional personal portfolio website built with vanilla HTML, CSS, and JavaScript. Designed with a dark futuristic aesthetic featuring glassmorphism, smooth animations, and responsive design.

![Portfolio Preview](assets/favicon.svg)

---

## ✨ Features

### Design & UI
- **Dark futuristic aesthetic** with purple (#7C5CFF) + cyan (#00D4FF) gradient
- **Glassmorphism cards** with backdrop-filter blur and soft borders
- **Animated background orbs** for subtle ambient depth
- **Custom cursor glow** on desktop devices
- **Dark / Light mode** with localStorage persistence and system preference detection
- **Smooth scroll-reveal animations** using IntersectionObserver
- **Responsive design** — works on 1920px desktop down to 390px mobile
- **Preloader animation** with branded TN logo

### Sections
- **Hero** — Typing animation, social links, code card visual
- **Quick Stats** — Editable statistics with animated counters
- **About Me** — Info badges, highlight cards, placeholder for photo
- **Skills** — Categorized skill cards with proficiency labels
- **Projects** — Filterable project cards with working category filters
- **Project Details Modal** — Rich modal with features, challenges, and learnings
- **Project Detail Page** — Standalone `project.html?id=<project-id>` pages
- **Currently Learning** — Progress bars with animated reveals
- **Education Timeline** — Vertical animated timeline
- **Achievements** — Placeholder cards (ready for your real achievements)
- **Certifications** — Placeholder (add yours when ready)
- **Coding Profiles** — GitHub, LeetCode, CodeChef, HackerRank, GeeksforGeeks
- **GitHub Activity** — Live GitHub API integration (repos + stats)
- **Resume** — Download/view with graceful fallback when file is missing
- **Contact** — Validated form with backend integration points (Formspree, EmailJS, etc.)

### Technical
- **Central configuration** — Edit `js/config.js` to update all personal data site-wide
- **No frameworks** — Vanilla HTML5, CSS3, JavaScript
- **SEO optimized** — Proper meta tags, Open Graph, Twitter Card, semantic HTML
- **Accessible** — ARIA labels, keyboard navigation, focus states, reduced-motion support
- **Performance** — IntersectionObserver for scroll effects, no heavy libraries
- **Security** — No API keys or secrets in frontend code
- **Vercel-ready** — Deploys as a static site with zero configuration

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main portfolio page
├── project.html            # Reusable project detail page
├── 404.html                # Custom 404 error page
├── robots.txt              # Search engine crawl rules
├── sitemap.xml             # XML sitemap for SEO
├── css/
│   └── style.css           # Complete stylesheet (design system + components)
├── js/
│   ├── config.js           # 📝 Central configuration — EDIT THIS FILE
│   ├── main.js             # Core functionality (theme, navbar, animations)
│   ├── projects.js         # Project filtering and modal logic
│   └── github.js           # GitHub API integration
└── assets/
    ├── favicon.svg         # TN monogram favicon
    ├── images/             # Profile photos and general images
    ├── projects/           # Project screenshots
    ├── icons/              # Custom icons
    └── resume/             # Resume PDF (add resume.pdf here)
```

---

## 🛠️ How to Run Locally

1. **Clone or download** this repository
2. Open the `portfolio` folder in **VS Code**
3. Install the **Live Server** extension (if not installed)
4. Right-click `index.html` → **"Open with Live Server"**
5. Your portfolio opens in the browser at `http://127.0.0.1:5500`

No build step, no `npm install`, no dependencies to manage.

---

## ✏️ How to Customize Your Information

### Step 1: Edit `js/config.js`

This is the **single source of truth** for all your personal data. Open it and replace the placeholder values:

```javascript
const portfolioConfig = {
  name: "Your Name",
  email: "your.email@example.com",
  social: {
    github: "https://github.com/YOUR_USERNAME",
    linkedin: "https://linkedin.com/in/YOUR_USERNAME",
    // ... other profiles
  },
  githubUsername: "YOUR_GITHUB_USERNAME",
  // ... projects, skills, education, etc.
};
```

Every section marked with `← Replace` needs your actual data.

### Step 2: Add Your Resume

Place your resume PDF at:
```
assets/resume/resume.pdf
```

### Step 3: Add Project Screenshots (Optional)

Place project images in `assets/projects/` and update the `image` field in config:
```javascript
image: "assets/projects/my-project.png"
```

### Step 4: Add Profile Photo (Optional)

Replace the "TN" placeholder in the About section by updating the HTML in `index.html` — change the `.image-placeholder` div to an `<img>` tag pointing to your photo in `assets/images/`.

---

## 🌐 How to Deploy to Vercel

### Option A: Via GitHub (Recommended)

1. Push this project to a **GitHub repository**
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** → Import your repository
4. Vercel auto-detects it as a static site
5. Click **Deploy** — your portfolio is live! 🎉

### Option B: Via Vercel CLI

```bash
npm i -g vercel
cd portfolio
vercel
```

### Custom Domain

After deploying, go to **Vercel Dashboard → Settings → Domains** to add your custom domain.

---

## 🔌 Connecting a Contact Form Backend

The contact form validates inputs but doesn't send emails by default. To enable email delivery:

### Using Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your endpoint
3. Update `js/config.js`:
```javascript
contactForm: {
  backend: "formspree",
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
}
```

### Using EmailJS

1. Sign up at [emailjs.com](https://emailjs.com)
2. Create a service, template, and get your public key
3. Add EmailJS SDK to `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```
4. Update `js/config.js`:
```javascript
contactForm: {
  backend: "emailjs",
  emailjs: {
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    publicKey: "YOUR_PUBLIC_KEY",
  },
}
```

---

## 🔒 Security Notes

- **No API keys** are stored in frontend code
- GitHub API uses **public endpoints** (no authentication required)
- Contact form backend credentials use environment variables where applicable
- All external links use `rel="noopener noreferrer"`

---

## ♿ Accessibility

- Skip link for keyboard navigation
- ARIA labels on interactive elements
- Visible focus states (`:focus-visible`)
- Semantic HTML5 elements (`header`, `nav`, `main`, `section`, `footer`)
- `prefers-reduced-motion` support — animations are disabled for users who prefer less motion
- Color contrast follows WCAG guidelines

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `1920px+` | Large desktop |
| `1200px` | Desktop |
| `1024px` | Small desktop / tablet landscape |
| `768px` | Tablet portrait / mobile nav activates |
| `480px` | Large mobile |
| `390px` | Small mobile |

---

## 🧰 Tech Stack

| Technology | Usage |
|-----------|-------|
| HTML5 | Structure and semantic markup |
| CSS3 | Styling, animations, responsive design |
| Vanilla JavaScript | Interactivity, DOM manipulation |
| Google Fonts | Inter + Poppins typography |
| Font Awesome | UI icons |
| Devicon | Technology/skill icons |
| GitHub REST API | Live profile and repository data |

---

## 📄 License

This portfolio is personal. Feel free to use the code structure as inspiration for your own portfolio, but please replace all personal information with your own.

---

Built with ❤️ by **Tapajyoti Nath**
