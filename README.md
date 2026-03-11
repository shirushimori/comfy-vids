# Comfy Hub - Video Streaming Platform

A modern, fully responsive video streaming platform built with vanilla JavaScript, HTML, and CSS. Stream your own videos with a sleek dark-themed interface featuring episode management, custom data sources, and a powerful JSON editor.

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
- Optional: Local server for development (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/comfy-hub.git
   cd comfy-hub
   ```

2. **Run locally (optional but recommended)**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. **Open in browser**
   - Direct: Open `index.html` in your browser
   - Local server: Navigate to `http://localhost:8000`

## Adding Your Videos

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

### How to Add Videos

#### Method 1: Using the Admin Panel (Recommended)
1. Navigate to `admin.html`
2. Click "JSON Editor" tab
3. Click "+ Add Video" button
4. Fill in video details
5. Add seasons and episodes
6. Click "Save JSON"

#### Method 2: Direct JSON Editing
1. Open `data.json` in your text editor
2. Add video objects following the format above
3. Save the file
4. Refresh the app

### Video Hosting Options

**For Embedded Videos:**
- YouTube: Use embed URLs like `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo: Use embed URLs like `https://player.vimeo.com/video/VIDEO_ID`
- Custom Server: Host on your own server and embed
- Other Platforms: Any platform that provides embed codes

**For Thumbnails:**
- Use direct image URLs (JPEG, PNG, WebP)
- Recommended size: 320x180px or larger
- Can be hosted on any image hosting service

### Example Video Entry

```json
{
  "id": "my-anime-series",
  "title": "My Awesome Anime",
  "author": "Studio Name",
  "date": "2024-03-11",
  "description": "An amazing anime series with great storytelling and animation.",
  "thumbnail": "https://example.com/anime-thumbnail.jpg",
  "seasons": [
    {
      "season": 1,
      "episodes": [
        {
          "episode": 1,
          "title": "The Beginning",
          "iframe": "<iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen></iframe>"
        },
        {
          "episode": 2,
          "title": "The Journey",
          "iframe": "<iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen></iframe>"
        }
      ]
    }
  ]
}
```

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

### Admin Panel (`admin.html`)
- **Settings Tab**: Same as main settings
- **JSON Editor Tab**: 
  - Add/edit/delete videos
  - Manage seasons and episodes
  - Save changes to local storage

## Data Sources

The app supports multiple data sources:

1. **Built-in Data** - `data.json` in the project
2. **Custom URLs** - Add via Settings panel
3. **Local Storage** - Changes persist in browser

### Adding Custom Data Sources

1. Go to Settings → Data Source
2. Enter your JSON URL in "Custom JSON URL"
3. Click "Add"
4. The app will merge your data with existing sources

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
- Check `data.json` format is valid JSON
- Verify iframe URLs are correct
- Check browser console for errors (F12)

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

## Credits

Built with vanilla JavaScript, HTML5, and CSS3.

---

**Made with ❤️ for video streaming enthusiasts**

Last Updated: March 2024
