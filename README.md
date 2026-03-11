# Comfy Hub - Video Streaming Platform

A modern, fully responsive video streaming platform built with vanilla JavaScript, HTML, and CSS. Stream your own videos with a sleek dark-themed interface featuring episode management, custom data sources, and a powerful JSON editor.

🌐 **Live Demo:** https://shirushimori.github.io/comfy-vids/

![Comfy Hub](favicon.svg)

## Features

✨ **Core Features**
- 🎬 Stream videos with embedded iframe support
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern dark theme with customizable accent colors
- 🔍 Search and filter episodes by season
- ⚙️ Settings panel for customization
- 📝 JSON editor for managing video data
- 🎯 Admin panel for content management
- 🖱️ Custom context menu
- 🎭 Multiple data source support (Music, Anime, Movies, Mix)

## Project Structure

```
comfy-hub/
├── index.html              # Main application page
├── home.html               # Home/browse page
├── player.html             # Video player page
├── admin.html              # Admin panel
├── favicon.svg             # App icon
├── data.json               # Video data (your content)
├── css/
│   ├── main.css            # Global styles & variables
│   ├── header.css          # Header styling
│   ├── player.css          # Player & sidebar styling
│   ├── views.css           # Grid & layout styling
│   ├── settings.css        # Settings modal styling
│   ├── editor.css          # JSON editor styling
│   ├── forms.css           # Form elements styling
│   └── context-menu.css    # Context menu styling
├── js/
│   ├── app.js              # Main app logic
│   ├── home.js             # Home page logic
│   ├── player.js           # Player page logic
│   ├── admin.js            # Admin panel logic
│   ├── editor.js           # JSON editor logic
│   └── shared.js           # Shared utilities
└── README.md               # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser
- No installation needed - works out of the box

### Quick Start (Recommended)

**🚀 Live Demo:**
Visit the live site: **https://shirushimori.github.io/comfy-vids/**

**Easiest Method - Open Directly:**
1. Download or clone the repository
2. Open `index.html` directly in your browser
3. That's it! The app is ready to use

```bash
# Clone the repository
git clone https://github.com/shirushimori/comfy-vids.git
cd comfy-vids

# Simply open index.html in your browser
# No server needed!
```

### Alternative: Local Server (Optional)

If you prefer running a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (http-server)
npx http-server
```

Then navigate to `http://localhost:8000`

## Adding Your Videos

### ⚡ Recommended Approach

**Keep it simple!** Edit `data.json` directly - it's the most reliable method.

> ⚠️ **Note:** The JSON Editor and Admin Panel features can be unstable. I recommend using the direct JSON editing method below for best results.

### Best Practice: Host JSON on GitHub

For the most reliable setup, host your `data.json` on GitHub:

1. **Create a GitHub repository** for your video data
2. **Upload `data.json`** to the repository
3. **Use the raw GitHub URL** in your app
4. **Get the raw file URL:**
   - Go to your `data.json` file on GitHub
   - Click "Raw" button
   - Copy the URL (format: `https://raw.githubusercontent.com/username/repo/main/data.json`)
5. **Add to Settings → Data Source → Custom JSON URL**

**Benefits:**
- ✅ Free hosting
- ✅ Version control & backup
- ✅ Easy to update
- ✅ Reliable CDN delivery
- ✅ No file size limits

### Video Data Format

Videos are stored in `data.json`. Here's the structure:

```json
{
  "videos": [
    {
      "id": "unique-id",
      "title": "Video Title",
      "author": "Author Name",
      "date": "2024-03-11",
      "description": "Video description here",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "seasons": [
        {
          "season": 1,
          "episodes": [
            {
              "episode": 1,
              "title": "Episode Title",
              "iframe": "<iframe src=\"https://example.com/embed\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen></iframe>"
            }
          ]
        }
      ]
    }
  ]
}
```

### How to Add Videos (Recommended Method)

**Direct JSON Editing (Most Reliable):**
1. Open `data.json` in your text editor
2. Add video objects following the format above
3. Save the file
4. Refresh the app in your browser
5. Your videos will appear immediately!

### Video Hosting Services

#### 🎬 For Video Hosting

**Recommended: [Abyss.to](https://abyss.to)**
- Free video hosting
- Signup required (free account)
- Get embed code directly
- Supports multiple formats
- No file size limits

**How to use Abyss.to:**
1. Visit https://abyss.to
2. Sign up for a free account
3. Upload your video
4. Copy the embed code
5. Paste into the `iframe` field in `data.json`

#### 🖼️ For Thumbnails & Files (Under 200MB)

**Recommended: [Catbox.moe](https://catbox.moe)**
- Free file hosting
- Up to 200MB per file
- No account required
- Direct links
- Reliable and fast

**How to use Catbox.moe:**
1. Visit https://catbox.moe
2. Upload your thumbnail image or file
3. Copy the direct link
4. Use in `data.json` thumbnail field

#### Alternative Video Hosting
- **YouTube**: Use embed URLs like `https://www.youtube.com/embed/VIDEO_ID`
- **Vimeo**: Use embed URLs like `https://player.vimeo.com/video/VIDEO_ID`
- **Any Platform**: That provides embed codes

### Example Video Entry

```json
{
  "id": "my-anime-series",
  "title": "My Awesome Anime",
  "author": "Studio Name",
  "date": "2024-03-11",
  "description": "An amazing anime series with great storytelling and animation.",
  "thumbnail": "https://files.catbox.moe/abc123.jpg",
  "seasons": [
    {
      "season": 1,
      "episodes": [
        {
          "episode": 1,
          "title": "The Beginning",
          "iframe": "<iframe src=\"https://abyss.to/embed/abc123\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen></iframe>"
        },
        {
          "episode": 2,
          "title": "The Journey",
          "iframe": "<iframe src=\"https://abyss.to/embed/def456\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen></iframe>"
        }
      ]
    }
  ]
}
```

### Quick Setup Checklist

- [ ] Sign up for free account at [Abyss.to](https://abyss.to)
- [ ] Upload video to Abyss.to
- [ ] Get embed code from Abyss.to
- [ ] Upload thumbnail to [Catbox.moe](https://catbox.moe)
- [ ] Get thumbnail link from Catbox.moe
- [ ] Edit `data.json` with your video info
- [ ] Save `data.json`
- [ ] Refresh browser
- [ ] Done! Video appears in app

## Customization

### Custom SVG Icons

All icons in the app use inline SVG. To customize:

1. **Header Logo** - Edit in `index.html`, `home.html`, `player.html`, `admin.html`
   ```html
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
     <!-- Your SVG path here -->
   </svg>
   ```

2. **Navigation Icons** - Located in header sections
3. **Button Icons** - Found throughout the interface

### Color Scheme

Edit CSS variables in `css/main.css`:

```css
:root {
    --bg-main: #000000;           /* Main background */
    --bg-card: #0a0a0a;           /* Card background */
    --bg-hover: #1a1a1a;          /* Hover state */
    --accent: #6366f1;            /* Primary accent (indigo) */
    --accent-hover: #4f46e5;      /* Accent hover */
    --text-primary: #ffffff;      /* Primary text */
    --text-secondary: #b0b0b0;    /* Secondary text */
    --border-color: #2a2a2a;      /* Border color */
}
```

### GUI Customization

#### Fonts
Change in `css/main.css`:
```css
body {
    font-family: 'Inter', sans-serif;  /* Change to your font */
}
```

#### Border Radius
Adjust roundness of elements:
```css
--radius-lg: 8px;    /* Large elements */
--radius-md: 6px;    /* Medium elements */
--radius-sm: 4px;    /* Small elements */
```

#### Spacing
Modify padding/margins in respective CSS files for different layouts.

## Usage Guide

### Home Page (`home.html`)
- Browse all available videos in a grid layout
- Click any video card to start watching
- Responsive grid adjusts for all screen sizes

### Player Page (`player.html`)
- Watch embedded videos
- Browse episodes by season
- Search episodes by title
- View video metadata (author, date, description)

### Settings (`index.html` - Settings Button)
- **General Settings**: Auto-play, descriptions toggle
- **Data Source**: Select content categories
- **Custom URLs**: Add custom JSON data sources

> ⚠️ **Note:** The Admin Panel and JSON Editor features can be unstable. For best results, edit `data.json` directly in your text editor.

## Data Sources

The app supports multiple data sources:

1. **Built-in Data** - `data.json` in the project
2. **GitHub Hosted JSON** - Recommended for custom data (see "Best Practice: Host JSON on GitHub" above)
3. **Custom URLs** - Add via Settings panel
4. **Local Storage** - Changes persist in browser

### Adding Custom Data Sources

**Method 1: GitHub (Recommended)**
1. Create a GitHub repo with your `data.json`
2. Get the raw file URL from GitHub
3. Go to Settings → Data Source → Custom JSON URL
4. Paste the raw GitHub URL
5. Click "Add"

**Method 2: Any Custom URL**
1. Host your JSON file anywhere (Catbox.moe, etc.)
2. Go to Settings → Data Source → Custom JSON URL
3. Paste the URL
4. Click "Add"

The app will merge your data with existing sources.

**Custom JSON Format** - Same as `data.json` structure

## Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Design

- **Desktop** (1024px+): Full layout with sidebar
- **Tablet** (768px-1023px): Optimized grid, stacked layout
- **Mobile** (480px-767px): Single column, touch-friendly
- **Small Mobile** (<480px): Compact layout

## File Descriptions

### HTML Files
- `index.html` - Main app with home view and player
- `home.html` - Standalone home/browse page
- `player.html` - Standalone player page
- `admin.html` - Admin panel for content management

### JavaScript Files
- `app.js` - Main application logic, view switching
- `home.js` - Home page video grid logic
- `player.js` - Player page and episode management
- `admin.js` - Admin panel functionality
- `editor.js` - JSON editor for video management
- `shared.js` - Utility functions, context menu

### CSS Files
- `main.css` - Global styles, CSS variables, responsive base
- `header.css` - Header and navigation styling
- `player.css` - Video player and sidebar styling
- `views.css` - Grid layouts and animations
- `settings.css` - Settings modal and forms
- `editor.css` - JSON editor modal styling
- `forms.css` - Form elements (inputs, buttons, checkboxes)
- `context-menu.css` - Custom context menu styling

## Local Storage

The app uses browser's local storage to persist:
- User settings (auto-play, descriptions)
- Selected data sources
- Custom JSON URLs
- Editor changes (until saved)

Clear storage: Open DevTools → Application → Local Storage → Clear All

## Troubleshooting

### Videos not loading
- Check `data.json` format is valid JSON (use [JSONLint](https://jsonlint.com) to validate)
- Verify iframe URLs are correct
- Check browser console for errors (F12)
- Ensure Abyss.to or your video host is accessible

### Videos not appearing after editing data.json
- Save the file
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check JSON syntax is valid
- Verify all required fields are present

### Thumbnails not showing
- Verify Catbox.moe link is correct
- Check image format is supported (JPG, PNG, WebP)
- Ensure URL is accessible
- Try a different image hosting service

### Settings not saving
- Ensure local storage is enabled
- Check browser privacy settings
- Try clearing cache and reloading

### Responsive layout issues
- Clear browser cache
- Try different browser
- Check CSS files are loading (DevTools → Network)

### Custom data not appearing
- Verify JSON format is correct
- Check URL is accessible
- Ensure CORS is enabled on custom server

## Performance Tips

1. **Optimize Thumbnails** - Use compressed images (WebP format)
2. **Lazy Loading** - Videos load on demand
3. **Caching** - Browser caches CSS/JS files
4. **CDN** - Host images on CDN for faster loading

## Security Notes

- All processing happens client-side (no server)
- No data is sent to external servers
- Local storage is browser-specific
- Custom URLs should be from trusted sources

## Development

### Adding New Features
1. Edit relevant JS file in `js/` folder
2. Add styles to corresponding CSS file
3. Test on multiple screen sizes
4. Update this README

### Code Structure
- Vanilla JavaScript (no frameworks)
- CSS Grid and Flexbox for layouts
- Responsive design with mobile-first approach
- Modular CSS organization

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues first
- Provide detailed description and steps to reproduce

## Roadmap

- [ ] Dark/Light theme toggle
- [ ] User accounts and watchlist
- [ ] Video recommendations
- [ ] Subtitle support
- [ ] Playlist creation
- [ ] Social sharing
- [ ] Progressive Web App (PWA)

## Quick Reference

### Recommended Services
| Service | Purpose | Link | Signup | Notes |
|---------|---------|------|--------|-------|
| GitHub | JSON Hosting | https://github.com | Free | **BEST** - Free, reliable, version control |
| Abyss.to | Video Hosting | https://abyss.to | Required | Free account, no limits |
| Catbox.moe | File/Image Hosting | https://catbox.moe | Not needed | Up to 200MB, no signup |
| JSONLint | JSON Validation | https://jsonlint.com | Not needed | Validate data.json syntax |

### File Editing Tips
- Use a code editor (VS Code, Sublime, Notepad++)
- Always validate JSON before saving
- Keep backups of working data.json
- Use proper indentation for readability

### Performance Tips
1. **Optimize Thumbnails** - Use compressed images (WebP format)
2. **Use Reliable Hosts** - GitHub for JSON, Abyss.to for videos, Catbox.moe for images
3. **Keep JSON Clean** - Remove unused entries
4. **Browser Caching** - CSS/JS files are cached automatically
## Credits

Built with vanilla JavaScript, HTML5, and CSS3.

---

**A tool for video streaming**

Last Updated: March 2024

---

## 📌 Important Notes

### Why Direct JSON Editing?
- ✅ Most reliable method
- ✅ No bugs or glitches
- ✅ Full control over data
- ✅ Easy to backup and version control
- ❌ Admin Panel/JSON Editor can be unstable - avoid for production

### Why GitHub for JSON Hosting?
- **Free** - No cost, unlimited storage
- **Reliable** - GitHub's CDN ensures fast delivery
- **Version Control** - Track all changes to your data
- **Easy Updates** - Edit directly on GitHub or locally
- **Backup** - Automatic backup of all versions
- **Shareable** - Easy to share raw URLs with others

### Why These Services?
- **GitHub**: Best for JSON hosting - free, reliable, version control
- **Abyss.to**: Free video hosting (signup required), no limits
- **Catbox.moe**: Free file/image hosting, up to 200MB, no signup needed
- All are reliable and easy to use

### Getting Started in 5 Minutes
1. Create a GitHub repository
2. Upload `data.json` to GitHub
3. Get the raw file URL from GitHub
4. Sign up for free account at Abyss.to
5. Upload video to Abyss.to, get embed code
6. Upload thumbnail to Catbox.moe, get link
7. Add video info to `data.json` with embed codes
8. Add GitHub JSON URL to Settings → Data Source → Custom JSON URL
9. Videos appear in app - Done!
