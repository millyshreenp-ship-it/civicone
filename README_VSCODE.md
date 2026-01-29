# CivicOne - VS Code Setup Guide

## Quick Start (5 Minutes)

### Prerequisites
- Node.js 16+ installed ([Download here](https://nodejs.org/))
- VS Code installed ([Download here](https://code.visualstudio.com/))

### Installation Steps

1. **Extract the project folder**
   ```bash
   # Navigate to where you extracted civicone-project
   cd civicone-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Server will automatically open at `http://localhost:3000`
   - Or manually visit: `http://localhost:3000`

That's it! The app should now be running.

## Project Structure

```
civicone-project/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles
│   ├── components/        # Reusable components
│   │   ├── AuthScreen.jsx
│   │   ├── Icons.jsx
│   │   ├── QuickReportModal.jsx
│   │   ├── Sidebar.jsx
│   │   └── TopBar.jsx
│   ├── pages/             # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── FeedPage.jsx
│   │   ├── LeaderboardPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ReportPage.jsx
│   │   └── VerificationPage.jsx
│   └── data/              # Mock data
│       └── mockData.js
```

## Available Scripts

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## VS Code Extensions (Recommended)

Install these for the best development experience:

1. **ES7+ React/Redux/React-Native snippets** - Code snippets
2. **Prettier - Code formatter** - Auto-formatting
3. **ESLint** - Code linting
4. **Auto Rename Tag** - Rename paired HTML/JSX tags

## Development Tips

### Hot Reload
- Any changes you make will automatically refresh in the browser
- No need to restart the server

### Editing Tips
1. **To change colony list:** Edit `/src/data/mockData.js` → `DELHI_COLONIES`
2. **To add categories:** Edit `/src/data/mockData.js` → `CATEGORIES`
3. **To modify colors:** Edit `/src/index.css` → `:root` section
4. **To add issues:** Edit `/src/data/mockData.js` → `INITIAL_ISSUES`

### Component Overview

**App.jsx** - Main application logic, state management
**AuthScreen.jsx** - Signup/colony selection screen
**FeedPage.jsx** - Main issue feed with filters and map view
**ReportPage.jsx** - Issue reporting form with image upload
**VerificationPage.jsx** - Community verification interface
**AdminDashboard.jsx** - Admin panel for managing issues
**LeaderboardPage.jsx** - Civic score rankings
**ProfilePage.jsx** - User profile and badges
**NotificationsPage.jsx** - In-app notifications

## Key Features Implemented

✅ **Colony Selection** - Mandatory during signup, filters all views
✅ **Issue Reporting** - Image upload, auto-location, AI check (mocked)
✅ **Community Verification** - Vote-based verification system (3+ votes)
✅ **Status Tracking** - Full timeline from report to resolution
✅ **Civic Scoring** - Points, levels (Bronze/Silver/Gold), badges
✅ **Leaderboard** - Colony-based rankings
✅ **Admin Dashboard** - Issue management with filters
✅ **Notifications** - In-app notification system
✅ **Map View** - Mocked map with issue markers

## Design System

### Colors
- **Civic Blue** (#1E3A8A) - Primary brand color
- **Saffron** (#FF9933) - Accent highlights
- **Green** (#138808) - Success states
- **Background** (#F8FAFC) - Off-white app background

### Typography
- **DM Sans** - Body text and UI
- **Spectral** - Headers and titles

### Visual Identity
- Government dashboard aesthetic
- India flag-inspired colors (subtle, professional)
- Flat UI design (no gradients)
- 8px spacing grid

## Troubleshooting

### Port 3000 already in use?
```bash
# Edit vite.config.js and change port:
server: {
  port: 3001,  // Use different port
  open: true
}
```

### Dependencies won't install?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Hot reload not working?
```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev
```

### Build errors?
```bash
# Check Node.js version (should be 16+)
node --version

# Update npm
npm install -g npm@latest
```

## Demo Flow (60 Seconds)

1. **[0-10s] Signup**
   - Enter name: "Demo User"
   - Contact: "demo@civicone.in"
   - Select: "Lajpat Nagar"

2. **[10-20s] Feed**
   - View 4 issues in colony
   - Toggle List/Map view
   - Filter by category

3. **[20-35s] Report**
   - Click FAB (+) button
   - Select "Pothole" chip
   - Upload image
   - Add description
   - Submit

4. **[35-45s] Verify**
   - Go to Community Verification
   - Vote "Yes" on an issue
   - Watch count increase

5. **[45-52s] Profile & Leaderboard**
   - View Civic Score
   - Check badges
   - See colony rankings

6. **[52-60s] Admin**
   - Enable Admin Mode
   - View dashboard stats
   - Mark issue as Resolved
   - See notification

## Customization Guide

### Change App Name
1. Edit `index.html` → `<title>` tag
2. Edit `src/components/Sidebar.jsx` → logo section
3. Edit `src/components/AuthScreen.jsx` → auth-logo

### Add New Category
1. Edit `src/data/mockData.js`:
```javascript
export const CATEGORIES = [
  'Garbage',
  'Pothole',
  'Streetlight',
  'Street Dogs',
  'Safety',
  'Water Supply',  // Add new category
]
```

2. Add CSS color in `src/index.css`:
```css
.chip-watersupply { 
  background: #DBEAFE; 
  color: #1E40AF; 
  border-color: #93C5FD; 
}
```

### Modify Scoring System
Edit `src/App.jsx` → `onVerify` function to adjust point awards

### Change Colony List
Edit `src/data/mockData.js` → `DELHI_COLONIES` array

## Production Build

To create a production-ready build:

```bash
npm run build
```

This creates a `dist` folder with optimized files. Deploy this folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool (fast hot reload)
- **CSS Variables** - Design system
- **No external UI libraries** - Custom components

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Need Help?

Common issues and solutions:

**Q: App won't start?**
A: Run `npm install` first, then `npm run dev`

**Q: Styles look broken?**
A: Clear browser cache (Ctrl+Shift+R)

**Q: Images won't upload?**
A: Check browser console for errors, ensure file is image type

**Q: Want to add real backend?**
A: Replace mock data in `mockData.js` with API calls

## Next Steps

For production deployment:

1. **Backend Integration**
   - Replace mock data with Firebase/Supabase
   - Add authentication (phone OTP)
   - Store images in cloud storage

2. **Real Features**
   - Google Maps integration
   - Actual geolocation
   - Real AI image verification
   - Push notifications

3. **Enhancements**
   - Multi-language support
   - Authority dashboard
   - Issue comments
   - Social sharing

---

**Built for:** Civic tech hackathon demo  
**Design:** Government-grade, patriotic, professional  
**Status:** Demo-ready MVP with full UI/UX  

Enjoy building with CivicOne! 🇮🇳
