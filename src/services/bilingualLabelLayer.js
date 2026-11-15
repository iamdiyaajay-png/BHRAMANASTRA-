/**
 * BHRAMANASTHRA Bilingual Geographic Label Overlay
 * 
 * Provides an international scientific geographic label overlay for Leaflet.
 * Displays English names alongside authentic local-language names:
 *   Format: <Local Name> · <English Name>
 * 
 * Sourced from open geographic data (OpenStreetMap & Natural Earth standards).
 * Operates without API keys or paid dependencies.
 */

import L from 'leaflet';
import { BILINGUAL_PLACES } from '../data/bilingualPlaces';

// HTML escaper to ensure safe injection into Leaflet divIcon
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Format bilingual label object into HTML and plain text representation.
 * Follows the requirement:
 * - English name must always be visible when available.
 * - Local-language name appears alongside English when available.
 * - English is visually highlighted.
 * - Avoids duplicate labels when both names are identical (case-insensitive).
 * - Fallbacks: if English is unavailable -> local name; if local is unavailable -> English.
 * - Never invents translations.
 */
export function formatBilingualLabel(place) {
  if (!place) return { html: '', text: '', isBilingual: false };

  const local = (place.name || '').trim();
  const en = (place.name_en || '').trim();

  // Fallback cases
  if (!en && !local) {
    return { html: '', text: '', isBilingual: false };
  }
  if (!local) {
    return {
      html: `<span class="label-en">${escapeHtml(en)}</span>`,
      text: en,
      isBilingual: false
    };
  }
  if (!en) {
    return {
      html: `<span class="label-local">${escapeHtml(local)}</span>`,
      text: local,
      isBilingual: false
    };
  }

  // Avoid duplicate labels when both names are identical (e.g. France, Kenya, Madrid)
  if (local.toLowerCase() === en.toLowerCase()) {
    return {
      html: `<span class="label-en">${escapeHtml(en)}</span>`,
      text: en,
      isBilingual: false
    };
  }

  // Bilingual presentation: Local · English
  return {
    html: `<span class="label-local">${escapeHtml(local)}</span><span class="label-sep"> · </span><span class="label-en">${escapeHtml(en)}</span>`,
    text: `${local} · ${en}`,
    isBilingual: true
  };
}

/**
 * Calculate dynamic minimum pixel distance between labels based on current zoom
 * to prevent overlapping at low zoom levels and allow rich detail at high zoom.
 */
function getMinCollisionDistance(zoom) {
  if (zoom <= 3) return 75; // Continental scale: strict spacing
  if (zoom <= 5) return 55; // Country scale
  if (zoom <= 7) return 40; // Regional/State scale
  return 25;                // City/Local scale
}

/**
 * Leaflet Bilingual Labels Overlay Controller
 */
export class BilingualLabelsController {
  constructor(map, options = {}) {
    this.map = map;
    this.options = {
      places: BILINGUAL_PLACES,
      enabled: options.enabled ?? true,
      ...options
    };

    this.layerGroup = null;
    this.pane = null;
    this._boundUpdate = this.update.bind(this);
    this._initPane();
    this._initLayer();
  }

  _initPane() {
    if (!this.map) return;
    const paneName = 'bilingualLabelsPane';
    let pane = this.map.getPane(paneName);
    if (!pane) {
      pane = this.map.createPane(paneName);
      // Place above satellite raster layers (z-index 50) and study area overlays,
      // but below popups (600) and tooltips (650).
      pane.style.zIndex = '550';
      // Crucial: Pass-through mouse/touch events so drawing and map clicks work seamlessly
      pane.style.pointerEvents = 'none';
    }
    this.pane = pane;
  }

  _initLayer() {
    if (!this.map) return;
    this.layerGroup = L.layerGroup([], { pane: 'bilingualLabelsPane' });
    this.layerGroup.addTo(this.map);

    this.map.on('moveend', this._boundUpdate);
    this.map.on('zoomend', this._boundUpdate);

    if (this.options.enabled) {
      this.update();
    }
  }

  setEnabled(enabled) {
    this.options.enabled = Boolean(enabled);
    if (this.layerGroup) {
      if (this.options.enabled) {
        if (!this.map.hasLayer(this.layerGroup)) {
          this.layerGroup.addTo(this.map);
        }
        this.update();
      } else {
        this.layerGroup.clearLayers();
      }
    }
  }

  update() {
    if (!this.map || !this.options.enabled || !this.layerGroup) return;

    const zoom = this.map.getZoom();
    // Add small buffer to bounds so labels at the border don't abruptly pop in
    const bounds = this.map.getBounds().pad(0.08);
    const minDistance = getMinCollisionDistance(zoom);
    const placedPoints = [];

    // Filter places by current zoom range and viewport bounds
    const candidates = this.options.places.filter(place => {
      if (place.minZoom != null && zoom < place.minZoom) return false;
      if (place.maxZoom != null && zoom > place.maxZoom) return false;
      return bounds.contains([place.lat, place.lon]);
    });

    // Sort by priority (1 = highest priority, placed first)
    candidates.sort((a, b) => (a.priority || 5) - (b.priority || 5));

    this.layerGroup.clearLayers();

    for (const place of candidates) {
      const containerPoint = this.map.latLngToContainerPoint([place.lat, place.lon]);

      // Anti-collision check against already placed labels at this zoom level
      let collides = false;
      for (const pt of placedPoints) {
        const dx = pt.x - containerPoint.x;
        const dy = pt.y - containerPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) {
          collides = true;
          break;
        }
      }

      if (collides) continue;

      placedPoints.push(containerPoint);

      const labelData = formatBilingualLabel(place);
      if (!labelData.html) continue;

      const typeClass = place.type ? `label-${place.type}` : 'label-place';
      const bilingualClass = labelData.isBilingual ? 'has-bilingual' : 'single-lang';

      const icon = L.divIcon({
        className: 'bilingual-label-marker',
        html: `<div class="bilingual-map-label ${typeClass} ${bilingualClass}" data-place-id="${escapeHtml(place.name_en || place.name)}">${labelData.html}</div>`,
        iconSize: null, // Let CSS determine natural size
        iconAnchor: [0, 0] // Centered via CSS transform
      });

      const marker = L.marker([place.lat, place.lon], {
        icon: icon,
        pane: 'bilingualLabelsPane',
        interactive: false,
        keyboard: false
      });

      this.layerGroup.addLayer(marker);
    }
  }

  destroy() {
    if (this.map) {
      this.map.off('moveend', this._boundUpdate);
      this.map.off('zoomend', this._boundUpdate);
    }
    if (this.layerGroup && this.map) {
      this.map.removeLayer(this.layerGroup);
      this.layerGroup = null;
    }
  }
}

