# Darshan Babariya - Portfolio Website

Professional portfolio showcasing backend engineering, DevOps, AI/ML, and cloud solutions expertise.

## 🚀 Features

- ✅ Modern, responsive React design
- ✅ Showcases StorageDNA & Healthray projects
- ✅ Highlights DevOps, AI/ML, and Cloud skills
- ✅ Direct links to LinkedIn & GitHub
- ✅ Optimized for remote job opportunities
- ✅ Dark theme with smooth animations

## 🛠️ Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📦 Installation

### Option 1: Deploy Directly to Vercel (Recommended - 5 minutes!)

1. **Push to GitHub:**
   ```bash
   # Initialize git (if not already)
   git init
   git add .
   git commit -m "Initial portfolio commit"
   
   # Create a new repository on GitHub named "portfolio" or "darshan-portfolio"
   # Then push:
   git remote add origin https://github.com/darshan2101/portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy"
   - Done! ✅

Your site will be live at: `https://your-project-name.vercel.app`

### Option 2: Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

## 🌐 Deployment Steps (Detailed)

### Method 1: Vercel Dashboard (Easiest)

1. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Name: `portfolio` or `darshan-portfolio`
   - Create repository

2. **Push Code to GitHub:**
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial commit: Professional portfolio"
   git branch -M main
   git remote add origin https://github.com/darshan2101/portfolio.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New" → "Project"
   - Select your `portfolio` repository
   - Framework Preset: Vite (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)
   - Click "Deploy"

4. **Wait 2-3 minutes** - Your site will be live!

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? N
# - Project name: darshan-portfolio
# - Directory: ./
# - Override settings? N

# Production deployment
vercel --prod
```

## 🎨 Customization

### Update Personal Information:

Edit `src/App.jsx` and update:

1. **Links:**
   - GitHub: Line 23 - Update URL
   - LinkedIn: Line 27 - Update URL
   - Email: Line 31 - Update email

2. **Projects:**
   - Lines 35-78: Edit project details, descriptions, highlights

3. **Skills:**
   - Lines 21-24: Add/remove skills

4. **Experience:**
   - Lines 80-94: Update work experience

### Change Theme Colors:

Current theme uses cyan/blue/purple. To change:

1. Replace `cyan-` with your color (e.g., `emerald-`, `violet-`, `rose-`)
2. Replace `blue-` with complementary color
3. Search and replace throughout `App.jsx`

### Add More Sections:

Add before the Contact Section:
```jsx
{/* Certifications Section */}
<section className="py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-12">Certifications</h2>
    {/* Your content */}
  </div>
</section>
```

## 🔧 Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## 📱 Custom Domain (Optional)

### On Vercel:

1. Go to your project → Settings → Domains
2. Add your custom domain (e.g., `darshanbabariya.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### Popular Domain Providers:
- **Namecheap** - Affordable ($8-12/year)
- **Google Domains** - Simple interface
- **Cloudflare** - Free DNS + CDN

## 📊 Analytics (Optional)

### Add Google Analytics:

1. Get tracking ID from analytics.google.com
2. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🐛 Troubleshooting

### Build Fails on Vercel:

**Issue:** "Cannot find module 'lucide-react'"
**Fix:** Vercel should auto-install. If not, check `package.json` has all dependencies

**Issue:** "Tailwind classes not working"
**Fix:** Ensure `tailwind.config.js` and `postcss.config.js` are in root directory

### Local Development Issues:

**Issue:** "Cannot find module"
**Fix:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Port already in use
**Fix:** 
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# Or use different port
npm run dev -- --port 3000
```

## 📝 Update Content

To update your portfolio content:

1. Edit `src/App.jsx`
2. Commit changes:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```
3. Vercel auto-deploys (2-3 minutes)

## 🎯 SEO Optimization

Already included:
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Semantic HTML
- ✅ Fast loading (Vite)
- ✅ Mobile responsive

### Add to Google Search Console:

1. Visit https://search.google.com/search-console
2. Add your Vercel URL
3. Verify ownership
4. Submit sitemap (optional)

## 🔒 Environment Variables (If Needed)

Create `.env` file:
```
VITE_API_URL=your_api_url
VITE_GA_ID=your_analytics_id
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 🙏 Credits

Built by Darshan Babariya
- GitHub: [@darshan2101](https://github.com/darshan2101)
- LinkedIn: [darshan-babariya-dev](https://linkedin.com/in/darshan-babariya-dev)

## 🚀 Quick Start Checklist

- [ ] Update all personal links (GitHub, LinkedIn, Email)
- [ ] Edit project descriptions
- [ ] Update skills list
- [ ] Customize colors (optional)
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Test on mobile devices
- [ ] Share with friends/recruiters!

## 💡 Tips for Job Applications

**Include Portfolio in:**
- ✅ LinkedIn Featured section
- ✅ Resume (under Contact)
- ✅ Email signatures
- ✅ Job applications

**Example:**
```
Portfolio: https://your-name.vercel.app
```

---

**Need help?** Open an issue or reach out via email!

**Happy deploying!** 🎉
