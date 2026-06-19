# Recycling Drop-Off Locator

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google Maps API](https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)](https://developers.google.com/maps)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

A premium, location-based web application designed to empower local communities with seamless access to recycling facilities. By merging interactive mapping with real-time geospatial search, this application simplifies the drop-off lookup process while promoting responsible waste management, material compliance, and individual environmental accountability.

---

## 1. Project Overview

The **Recycling Drop-Off Locator** (CycleHub) is a specialized find-and-drop web portal built to bridge the gap between local eco-conscious citizens and municipal recycling infrastructure. 

### Why This Matters
For millions of users around the globe, localized recycling protocols remain opaque: knowing *where* a specific center resides, *which* specific materials (plastic, alloys, electronics, batteries) are compliant, and *when* gates are open is a friction point that leads to landfill overflow. 

This platform leverages modern geolocation protocols and interactive map routing grids to:
* Suggest matching stores instantly based on physical location (GPS coordinates).
* Filter through exhaustive center directories by material category.
* Model carbon emission savings relative to the surrounding community.
* Detail exact material compliance checklists so materials arrive clean, separated, and highly processable.

---

## 2. Features

* **Interactive Google Maps Integration:** Seamless, real-time map rendering with custom high-contrast styling, responsive map pin markers, and smooth camera panning animations. Includes a resilient vector sandbox fallback for offline or headless environments.
* **Location Search & Autocomplete:** Search bar supporting city, keyword, suburb, or ZIP code searches to instantly query local center databases.
* **Material Category Filters:** Modular pill selector tabs interface allowing users to dynamically filter drop points by electronic waste, paper/cardboards, metals/alloys, batteries, plastics, or glass.
* **SaaS Utility Indicators:** Distance calculations showing exact mileage or kilometers from user location to nearest center, as well as operational hours, verification tags, star ratings, and contact listings.
* **Recycling Guidelines Reference:** Interactive accordions and slide drawers explaining municipal waste preparation standards (wash guidelines, sorting, hazardous labels, etc.).
* **FAQ Section:** A beautifully styled, expandable question-and-answer deck resolving common user inquiries about processing limits, costs, and high-volume drops.
* **Modern Frosted Glass User Interface:** Tailored fluid components styled with premium frosted glass panel effects, modern color palettes, generous white space, and rich animated interactions driven by `motion`.
* **Responsive Layout:** Precision designed to deliver an equally high-fidelity, touch-target compliant experience across mobile devices, tablets, and ultra-wide desktops.

---

## 3. Screenshots

### Homepage
*A sleek, modern hero dashboard featuring dynamic visual metrics, carbon tickers, and rapid navigation hooks.*
```
┌─────────────────────────────────────────────────────────────┐
│                       [ Navigation Rail ]                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   CycleHub.               Want to check carbon output?      │
│   Recycling Drop-Off      [ Locate Nearest Center ]         │
│   Store Locator           [ Tons Carbon Kept: 4,812 T ]     │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Store Locator
*Interactive dual-pane setup featuring category filtering pills, geolocation triggers, and detailed listing cards.*
```
┌───────────────────────────┬─────────────────────────────────┐
│ [🔍 Search city or zip...]│                                 │
│                           │        [ Interactive Map ]      │
│ Filter: [Plastics] [Paper]│                                 │
│                           │         ( Malleswaram )         │
│ 📍 E-GreenHub             │              [📍]               │
│    Rating: 4.8            │                                 │
│    Open Now • 0.8 Miles   │        ( Indiranagar )          │
│                           │              [📍]               │
└───────────────────────────┴─────────────────────────────────┘
```

### Interactive Map
*Geospatial mapping layout pointing out localized coordinates, active routes, and active user location badges.*
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                 [📍 Active Point Match ]                       │
│                       E-GreenHub                            │
│                 14 min drive • Clear Traffic                │
│                                                             │
│                     👤 [My Grid GPS]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Mobile View
*Responsive one-column stack utilizing high contrast touch-friendly filters and expandable sticky drawers.*
```
┌──────────────────────────┐
│  CycleHub.        [ ☰ ]  │
├──────────────────────────┤
│                          │
│ [🔍 Search Area...]      │
│                          │
│ 📍 Active Listing Match │
│    E-GreenHub            │
│                          │
│ 📞 Drop-Off Hotline      │
│                          │
└──────────────────────────┘
```

---

## 4. Tech Stack

* **Front-End Library:** [React 18+](https://react.dev/) (Functional Components, Custom Contexts, React Hooks)
* **Build System & Tooling:** [Vite](https://vite.dev/) (Speed-optimized bundler, ES Module packaging)
* **Language Compiler:** [TypeScript](https://www.typescriptlang.org/) (Strictly-typed runtime prevention, unified interface contracts)
* **Geospatial API Engine:** [Google Maps JavaScript SDK / @react-google-maps/api](https://developers.google.com/maps/documentation/javascript/overview)
* **CSS & Utility Framework:** [Tailwind CSS v4](https://tailwindcss.com/) (Rapid, responsive utility styling with high-performance CSS theme injection)
* **Motion & Animations:** [motion/react](https://www.framer.com/motion/) (Staggered entrance layouts, scroll animations, micro-spring transitions)
* **Icon Suite:** [lucide-react](https://lucide.dev/) (Unified minimalist vector icons SVG)
* **Deployment & CDN Platform:** [Firebase Hosting](https://firebase.google.com/docs/hosting) & [Vercel CDN Edge Network](https://vercel.com/)

---

## 5. Project Structure

```text
├── .env.example              # Sample environment configuration template
├── .gitignore                # Production untracked file ignore lists
├── index.html                # Main SPA entry document
├── metadata.json             # Application metadata, descriptions and permissions
├── package.json              # Custom build scripts and npm dependencies list
├── tsconfig.json             # TypeScript structural compilation parameters
├── vite.config.ts            # Vite client bundler configurations
├── assets/                   # Heavy static assets and layouts
└── src/                      # Source directory
    ├── App.tsx               # Primary Application router and content wrapper
    ├── index.css             # Unified CSS, font configurations, and Tailwind directives
    ├── main.tsx              # React mounting root compiler
    ├── types.ts              # Global design interfaces and type schemas
    ├── components/           # Modularized UI Components block
    │   ├── About.tsx         # Service background and strategic statistics section
    │   ├── Contact.tsx       # Local recycling hotline and dispatch form drawer
    │   ├── FAQ.tsx           # Accordion inquiries and compliant drop details
    │   ├── Footer.tsx        # High-density navigation links and info tags
    │   ├── Guidelines.tsx    # Material requirements reference section
    │   ├── Header.tsx        # Floating background blur header with dynamic scroll locks
    │   ├── Hero.tsx          # Headline display screen with micro trusts metrics
    │   ├── HowItWorks.tsx    # Linear sequence flow detailing steps
    │   └── StoreLocator.tsx  # Core Map application, dynamic lists, and sandbox panel
    └── data/                 # Static JSON store libraries
        ├── centers.json      # Geospatial center logs metadata (Bengaluru area)
        └── guidelines.json   # Acceptable prep directories parameters
```

---

## 6. Getting Started

### Prerequisites
Make sure you have [Node.js (v18 or higher)](https://nodejs.org/) installed:
```bash
node --version
npm --version
```

### Steps to Run Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/recycle-drop-locator.git
   cd recycle-drop-locator
   ```

2. **Install Dependecies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Duplicate the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your valid keys (see **Environment Variables** below for details).

4. **Boot the Development Server:**
   ```bash
   npm run dev
   ```
   Your app will compile and be served locally at `http://localhost:3000` or `http://localhost:5173`. Open your browser to begin testing.

5. **Build for Production Compilation:**
   To output a speed-optimized, compressed bundle inside `/dist`:
   ```bash
   npm run build
   ```

---

## 7. Environment Variables

To activate Google Maps API services, you must supply a valid Maps credentials. Create a `.env` file in the root directory and configure the variable below:

```env
# Client-side Google Maps Key (VITE_ prefixed is required by Vite)
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

> **Note:** If `VITE_GOOGLE_MAPS_API_KEY` is omitted, missing, or unauthorized, the application will automatically activate the **interactive vector sandbox engine** fallback with complete coordinate match lists, mock GPS, and focus markers so that the application maintains absolute structural functionality.

---

## 8. Deployment

### Deploying to Firebase Hosting

1. **Initialize Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```
   * *Choose:* Public directory as `dist`
   * *Choose:* Configure as a single-page app (rewrite all URLs to /index.html) -> `Yes`

2. **Build and Deploy:**
   ```bash
   npm run build
   ```
   ```bash
   firebase deploy --only hosting
   ```

### Deploying to Vercel

1. **Install Vercel CLI (or connect GitHub repository):**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Trigger deployment:**
   ```bash
   vercel
   ```
   * *Build Command:* `npm run build`
   * *Output Directory:* `dist`
   * Set the environment variable `VITE_GOOGLE_MAPS_API_KEY` inside your Vercel Project Dashboard under Ecosystem settings.

---

## 9. Future Enhancements

* **Secure User Authentication:** Let users register accounts, track their localized drops, and log drop history.
* **Real-time Recycling Data Feed:** Integrate with live municipal APIs to track bin fullness or instant closures.
* **Route Optimization Engine:** Compute the most fuel-efficient route between multiple centers for commercial drops.
* **Recycling Analytics Dashboard:** Display graphic representations and custom charts showing estimated cumulative carbon offset metrics.
* **Mobile Companion Application:** Port existing React workflows to React Native for high-performance offline routing on iOS and Android.

---

## 10. Portfolio Note

> "This project was originally developed as a Master's Final Year Project and has been redesigned and modernized as a portfolio project to demonstrate geolocation services, Google Maps integration, interactive mapping, and modern web development practices."

---

## 11. License

Distributed under the MIT License. See `LICENSE` for more details.

---
*Created with meticulous attention to typography, fluid spacing, and high-contrast usability.*
