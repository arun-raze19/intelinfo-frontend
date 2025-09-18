# INTELINFO 2k25 - Symposium Frontend

A beautiful, modern glassmorphism-style frontend for the INTELINFO 2k25 symposium built with React, Vite, and modern CSS techniques.

## Features

- **Glassmorphism Design**: Beautiful frosted glass effects with transparency and backdrop blur
- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Clean, elegant interface with smooth animations
- **Four Main Pages**:
  - **Home**: Elegant landing page with centered register button
  - **Event Details**: Two-column layout for technical and non-technical events
  - **Registration**: Compelling registration page with urgency elements
  - **Connect With Us**: Contact information and communication form

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icons
- **CSS3** - Advanced CSS with glassmorphism effects
- **Inter Font** - Modern typography

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd intelinfo-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for easy deployment to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation component
│   └── Navbar.css          # Navigation styles
├── pages/
│   ├── Home.jsx            # Home page component
│   ├── Home.css            # Home page styles
│   ├── Events.jsx          # Events page component
│   ├── Events.css          # Events page styles
│   ├── Registration.jsx    # Registration page component
│   ├── Registration.css    # Registration page styles
│   ├── Connect.jsx         # Connect page component
│   └── Connect.css         # Connect page styles
├── styles/
│   └── index.css           # Global styles and glassmorphism framework
├── App.jsx                 # Main app component with routing
└── main.jsx                # React entry point
```

## Design Features

### Glassmorphism Effects
- Backdrop blur with `backdrop-filter: blur(20px)`
- Semi-transparent backgrounds with `rgba()` colors
- Subtle borders and shadows
- Layered translucent elements

### Color Palette
- Primary gradient: Blue to purple
- Secondary gradient: Pink to red
- Accent gradient: Blue to cyan
- Success gradient: Green to cyan
- Warning gradient: Pink to yellow

### Animations
- Smooth transitions and hover effects
- Floating gradient orbs
- Slide-in animations for content
- Pulse effects for urgency elements

## Customization

### Colors
Edit the CSS custom properties in `src/styles/index.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  /* ... more color variables */
}
```

### Content
- Update event details in `src/pages/Events.jsx`
- Modify pricing in `src/pages/Registration.jsx`
- Change contact information in `src/pages/Connect.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size with Vite
- Lazy loading for better performance
- Responsive images and assets
- Efficient CSS with minimal repaints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
