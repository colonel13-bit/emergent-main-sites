# Marketing Website with Decap CMS

A modern, responsive marketing website with visual content management system built using semantic HTML5, CSS3 custom properties, and Decap CMS.

## Design System

### Color Palette

```css
Primary:    #2596be (Eastern Blue)    - CTAs, links, primary actions
Accent:     #e28743 (Burnt Siena)     - Highlights, secondary actions
Background: #eeeee4 (Green White)     - Page background
Text:       #1F2933                   - Body text, headings
```

### Typography

**Font Family:** Gellix (all text)

**Type Scale:**
- xs: 12px (0.75rem)
- sm: 14px (0.875rem)
- base: 16px (1rem)
- lg: 18px (1.125rem)
- xl: 20px (1.25rem)
- 2xl: 24px (1.5rem)
- 3xl: 30px (1.875rem)
- 4xl: 36px (2.25rem)
- 5xl: 48px (3rem)
- 6xl: 60px (3.75rem)

**Line Heights:**
- Tight: 1.25 (headings)
- Normal: 1.5 (default)
- Relaxed: 1.75 (body text)

### Spacing

8px grid system:
- xs: 8px
- sm: 16px
- md: 24px
- lg: 32px
- xl: 48px
- 2xl: 64px
- 3xl: 96px
- 4xl: 128px

### Layout

- Max Content Width: 1200px
- Container Padding: 32px (responsive)
- Grid Columns: 12
- Breakpoints:
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+
  - Wide: 1440px+

## Project Structure

```
marketing-site/
├── index.html              # Main homepage
├── css/
│   └── style.css          # Main stylesheet with design tokens
├── js/
│   └── main.js            # Form handling and interactions
├── images/                 # Image assets
├── fonts/
│   └── gellix/            # Gellix font files (to be added)
├── content/                # CMS-managed content (generated)
│   ├── pages/
│   ├── blog/
│   ├── case-studies/
│   └── team/
├── admin/
│   ├── index.html         # CMS admin interface
│   └── config.yml         # CMS configuration
└── README.md              # This file
```

## CMS Approach: Decap CMS

**Why Decap CMS?**
- Free and open-source
- Visual editing interface
- Git-based (content stored as files in your repository)
- No database required
- Works with static site generators
- Easy hosting on Netlify, Vercel, or GitHub Pages

### CMS Features

**Current Content Types:**
- Home page sections (hero, intro, features, showcases, contact)
- Blog posts (ready for expansion)
- Case studies (ready for expansion)
- Team members (ready for expansion)

**Visual Editing:**
- Rich text editor for content
- Image upload and management
- Drag-and-drop media library
- Real-time preview
- Publishing workflow

## Setup Instructions

### 1. Font Installation

Download the Gellix font family and place the files in `fonts/gellix/`. Create a `gellix.css` file with `@font-face` declarations:

```css
@font-face {
    font-family: 'Gellix';
    src: url('Gellix-Regular.woff2') format('woff2'),
         url('Gellix-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'Gellix';
    src: url('Gellix-Medium.woff2') format('woff2'),
         url('Gellix-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'Gellix';
    src: url('Gellix-SemiBold.woff2') format('woff2'),
         url('Gellix-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: 'Gellix';
    src: url('Gellix-Bold.woff2') format('woff2'),
         url('Gellix-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
}
```

### 2. Add Placeholder Images

Replace placeholder images with actual images:
- `images/hero-placeholder.jpg` (1920x1080px recommended)
- `images/feature-1-placeholder.jpg` (800x600px)
- `images/feature-2-placeholder.jpg` (800x600px)
- `images/feature-3-placeholder.jpg` (800x600px)
- `images/showcase-1-placeholder.jpg` (1200x800px)
- `images/showcase-2-placeholder.jpg` (1200x800px)
- `images/showcase-3-placeholder.jpg` (1200x800px)

### 3. Deploy to Netlify (Recommended)

**Step 1:** Push your code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

**Step 2:** Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Choose your GitHub repository
4. Build settings:
   - Build command: (leave empty for static site)
   - Publish directory: `/` (root)
5. Click "Deploy site"

**Step 3:** Enable Netlify Identity & Git Gateway

1. In Netlify dashboard, go to "Identity"
2. Click "Enable Identity"
3. Go to "Settings" → "Identity" → "Services"
4. Enable "Git Gateway"
5. Under "Registration preferences", select "Invite only"

**Step 4:** Create CMS User

1. Go to Identity tab
2. Click "Invite users"
3. Enter your email
4. Accept the invitation email
5. Set your password

**Step 5:** Access CMS

Visit: `https://yoursite.netlify.app/admin/`

### 4. Local Development

For local development with Decap CMS:

**Install Decap CMS Proxy Server:**

```bash
npx decap-server
```

**Uncomment in `admin/config.yml`:**

```yaml
local_backend: true
```

**Start a local server:**

```bash
# Using Python
python -m http.server 8080

# Or using Node.js
npx http-server -p 8080
```

Access the site at `http://localhost:8080`
Access the CMS at `http://localhost:8080/admin/`

## Form Integration

### Contact Form

The contact form currently logs to console. To integrate with a backend:

**Option 1: Netlify Forms (Easiest)**

Add `netlify` attribute to the form in `index.html`:

```html
<form class="contact-form" name="contact" method="POST" netlify>
```

**Option 2: Custom API**

Update the `submitContactForm()` function in `js/main.js`:

```javascript
function submitContactForm(data) {
    return fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
}
```

### Newsletter Signup

Update the `submitNewsletter()` function in `js/main.js` to integrate with:
- Mailchimp
- ConvertKit
- SendGrid
- Buttondown
- Or your preferred email service provider

Example Mailchimp integration:

```javascript
function submitNewsletter(email) {
    return fetch('/api/mailchimp-subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    }).then(response => response.json());
}
```

## Customization Guide

### Update Colors

Edit CSS custom properties in `css/style.css`:

```css
:root {
    --color-primary: #2596be;
    --color-accent: #e28743;
    --color-background: #eeeee4;
    --color-text: #1F2933;
}
```

### Update Typography

Change font family in `css/style.css`:

```css
:root {
    --font-primary: 'YourFont', sans-serif;
}
```

### Update Spacing

Adjust spacing scale in `css/style.css`:

```css
:root {
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    /* etc. */
}
```

### Update LinkedIn URL

Replace in `index.html`:

```html
https://www.linkedin.com/company/yourcompany
```

## Content Management

### Editing Home Page Content

1. Go to `https://yoursite.netlify.app/admin/`
2. Login with your credentials
3. Click "Pages" → "Home Page"
4. Edit sections:
   - **Hero:** Title, subtitle, image, CTA
   - **Introduction:** Title and content
   - **Features:** Add/edit/remove feature cards
   - **Showcases:** Add/edit alternating image/content sections
   - **Contact:** Update description and LinkedIn
   - **Newsletter:** Update copy
   - **Footer:** Update branding and links
5. Click "Save" (saves to Git)
6. Click "Publish" (triggers site rebuild)

### Adding Blog Posts

1. Go to CMS → "Blog Posts"
2. Click "New Blog Post"
3. Fill in:
   - Title
   - Date
   - Author
   - Featured image
   - Content (markdown)
   - Tags
4. Save and publish

### Adding Case Studies

1. Go to CMS → "Case Studies"
2. Click "New Case Study"
3. Fill in client, challenge, solution, results
4. Optionally add testimonial
5. Save and publish

## SEO Optimization

### Update Meta Tags

Edit in `index.html`:

```html
<meta name="description" content="Your site description">
<title>Your Brand | Tagline</title>

<!-- Add Open Graph tags -->
<meta property="og:title" content="Your Brand">
<meta property="og:description" content="Your description">
<meta property="og:image" content="/images/og-image.jpg">

<!-- Add Twitter Card tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Brand">
<meta name="twitter:description" content="Your description">
```

### Add Sitemap & Robots.txt

Create `sitemap.xml` and `robots.txt` in the root directory.

### Add Google Analytics

Add before closing `</body>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Performance Optimization

### Image Optimization

- Use WebP format with fallbacks
- Compress images (use tools like TinyPNG, ImageOptim)
- Implement lazy loading (included in `main.js`)
- Use responsive images with `srcset`

### CSS & JS

- Already minified in production by most hosting platforms
- CSS is organized with low specificity
- JavaScript uses vanilla JS (no frameworks = faster)

### Caching

Configure in `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

## Accessibility

This site is built with accessibility in mind:
- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Focus states on all interactive elements
- Alt text on all images
- Form labels properly associated

### Testing Accessibility

Use these tools:
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Lighthouse in Chrome DevTools
- Keyboard navigation testing

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### CMS Not Loading

1. Check that Git Gateway is enabled in Netlify
2. Verify Identity service is running
3. Clear browser cache
4. Check browser console for errors

### Forms Not Submitting

1. Check network tab in browser dev tools
2. Verify API endpoint is correct
3. Check CORS settings if using custom API
4. For Netlify Forms, ensure `netlify` attribute is present

### Images Not Loading

1. Verify image paths are correct
2. Check image files exist in `images/` folder
3. Verify image formats are supported (jpg, png, webp, svg)

## Support & Documentation

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Netlify Documentation](https://docs.netlify.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## License

Copyright © 2026 Your Brand. All rights reserved.
