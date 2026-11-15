# BHRAMANASTHRA
### NASA Space Apps Challenge 2026: Earth Observation Explorer
**Global Interactive Earth Observation, Surface-Change Monitoring & Climate Intelligence**

---

## Overview

**BHRAMANASTHRA** is a single-page web application developed for the NASA Space Apps Challenge 2026. The platform enables researchers, emergency responders, and citizens to explore satellite imagery and climate telemetry worldwide. Users can select any custom area of interest on an interactive global map and receive automated meteorological analytics, multi-period statistical cards, time-series line charts, comparison bar charts, and plain-language climate insights.

---

## Core Features

1. **Global Map & NASA GIBS Imagery**:
   - High-contrast, dark-mode global basemap powered by MapTiler Dataviz-Dark (`tileSize: 512, zoomOffset: -1`).
   - Live NASA GIBS (Global Imagery Browse Services / Worldview) WMTS raster overlays:
     - 🛰️ **True Color Surface Imagery** (MODIS Terra Corrected Reflectance)
     - 🌡️ **Land Surface Temperature** (MODIS Terra Day)
     - 🌧️ **Precipitation / Rain Rate** (GPM IMERG)
     - 🌿 **Vegetation Index** (MODIS Terra NDVI 16-Day)
     - 💨 **Air Quality & Aerosols** (MODIS Terra Aerosol Optical Depth - AOD)
   - Interactive opacity slider (0%–100%) and date picker for historical observations.
   - Worldwide search box powered by OpenStreetMap Nominatim geocoding.
   - "Use My Location" GPS jump button.

2. **Custom Area Selection**:
   - **Rectangle Tool**: Click and drag or select two opposite corners.
   - **Polygon Tool**: Place freeform vertices on any terrain or boundary.
   - **Point + Radius Tool**: Single-click drop with an interactive buffer slider (5 km to 150 km).
   - High-visibility accent highlighting (`#FF6B35`), live area ($km^2$), and centroid coordinates readout.
   - Enforces single-selection state with automatic replacement and friendly validation rules.

3. **Data Visualisation & Plain-Language Insights**:
   - Live integration with the **NASA POWER API** (Prediction of Worldwide Energy Resources).
   - Resilient offline / rate-limit fallback to clearly labeled simulated datasets (`src/data/mockData.js`).
   - 4 summary statistical cards (30-day mean, peak extreme, period change %, anomaly state).
   - Interactive 30-day time-series line chart with Chart.js tooltips.
   - Multi-period comparison bar chart (Pre-Window vs Mid-Window vs Current).
   - Plain-language insight summary explaining meteorological trends in plain English.
   - Export tools: Download Line Chart as **PNG** image and data as **CSV** spreadsheet.

4. **User Experience & Accessibility**:
   - **Dark & Light Mode Toggle**: One-click switcher in the header that seamlessly flips UI surfaces and switches MapTiler basemaps between `dataviz-dark` and `dataviz-light` with persistent `localStorage` preference.
   - Responsive layout: Centered map with collapsible side panel on desktop; auto-adapts to a bottom sheet on mobile screens.
   - Visual 3-step workflow progress indicator in the header:
     - `Step 1`: Pick Layer & Date
     - `Step 2`: Select Area
     - `Step 3`: View Insights
   - First-time user interactive tour modal.
   - Full keyboard accessibility, visible focus rings, ARIA labels, and WCAG AA contrast.
   - Zero NASA logo or trademark branding per competition rules.

---

## Design System & Color Palette

The user interface follows the competition design specification:
```css
:root {
  --bg: #0B1026;       /* Deep space background */
  --surface: #151C3B;  /* Elevated dashboard panels and cards */
  --primary: #3D5AFE;  /* Interactive links, main buttons, step highlights */
  --accent: #FF6B35;   /* Active area selection and 'Analyse Area' button */
  --text: #F5F7FA;     /* High-contrast accessible text */
}
```

---

## How NASA Data is Used

- **NASA GIBS (Global Imagery Browse Services)**: Provides OpenGIS Web Map Tile Service (WMTS) tiles rendered directly on Leaflet. It displays daily, globally contiguous satellite observations from MODIS (Terra) and GPM satellites without requiring authentication.
- **NASA POWER API**: Supplies daily solar, meteorological, and surface temperature parameters calculated from NASA assimilation models and satellite observations.

---

## Setup & Running Locally

### Prerequisites
- Node.js LTS (`v20+` or `v26+`) and `npm` installed.

### Quick Start
```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

---

## Credits & Attributions

- **Data Sources**:
  - NASA Global Imagery Browse Services (GIBS), part of the NASA Earth Observing System Data and Information System (EOSDIS).
  - NASA POWER Project (NASA Langley Research Center).
  - MapTiler & OpenStreetMap for basemap tiles and Nominatim geocoding.
- **AI Collaboration**: Assisted by DeepMind Antigravity.
