import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div>
        <span>Data Sources: </span>
        <a href="https://gibs.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA GIBS (Worldview)</a>
        <span> • </span>
        <a href="https://power.larc.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA POWER API</a>
        <span> • </span>
        <a href="https://www.maptiler.com/" target="_blank" rel="noopener noreferrer">MapTiler</a>
        <span> &amp; </span>
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a>
      </div>

      <div>
        <span>Project: BHRAMANASTHRA • Built with React, Leaflet &amp; Chart.js • Assisted by DeepMind Antigravity</span>
      </div>
    </footer>
  );
}
