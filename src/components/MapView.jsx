import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getGibsTileUrl, GIBS_LAYERS } from '../services/gibsLayers';
import { searchLocation } from '../services/geocoding';

// Styling for the selected area
const SELECTION_STYLE = {
  color: '#FF6B35',
  weight: 2,
  opacity: 0.9,
  fillColor: '#FF6B35',
  fillOpacity: 0.22,
  dashArray: null
};

const PREVIEW_STYLE = {
  color: '#FF6B35',
  weight: 2,
  opacity: 0.7,
  fillColor: '#FF6B35',
  fillOpacity: 0.12,
  dashArray: '5, 5'
};

// Geodesic area calculation helper
function calculatePolygonArea(latlngs) {
  if (!latlngs || latlngs.length < 3) return 0;
  const R = 6378.137; // Earth radius in km
  let total = 0;
  for (let i = 0; i < latlngs.length; i++) {
    const p1 = latlngs[i];
    const p2 = latlngs[(i + 1) % latlngs.length];
    const rad = Math.PI / 180;
    total += (p2.lng - p1.lng) * rad * (2 + Math.sin(p1.lat * rad) + Math.sin(p2.lat * rad));
  }
  return Math.abs((total * R * R) / 2);
}

function calculateRectangleArea(bounds) {
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  const midLat = (sw.lat + ne.lat) / 2;
  const rad = Math.PI / 180;
  const widthKm = Math.abs(ne.lng - sw.lng) * 111.32 * Math.cos(midLat * rad);
  const heightKm = Math.abs(ne.lat - sw.lat) * 110.574;
  return widthKm * heightKm;
}

export default function MapView({
  theme = 'dark',
  selectedLayerId,
  selectedDate,
  opacity,
  drawMode,
  onSetDrawMode,
  pointRadiusKm,
  selectedArea,
  onSelectArea,
  onClearArea,
  onAnalyseArea,
  validationError,
  isAnalyzing,
  studyAreas = [],
  onSelectStudyArea,
  analysisData
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const baseTileLayerRef = useRef(null);
  const gibsTileLayerRef = useRef(null);
  const activeLayerRef = useRef(null);
  const previewLayerRef = useRef(null);
  const studyAreasLayerRef = useRef(null);
  const changeMaskLayerRef = useRef(null);

  // Drawing state refs
  const drawStateRef = useRef({
    startLatLng: null,
    points: []
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [geoNotice, setGeoNotice] = useState(null);
  const [showKeyWarning, setShowKeyWarning] = useState(!import.meta.env.VITE_MAPTILER_KEY);

  // 1. Initialize Map
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [15, 75], // Centered around Indian Ocean / South Asia study region
      zoom: 4,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false
    });

    // Zoom controls on top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 1b. Basemap Tile Layer (Updates dynamically when theme toggles)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
      baseTileLayerRef.current = null;
    }

    const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;
    const styleId = theme === 'light' ? 'dataviz-light' : 'dataviz-dark';

    if (mapTilerKey) {
      const baseLayer = L.tileLayer(`https://api.maptiler.com/maps/${styleId}/{z}/{x}/{y}.png?key=${mapTilerKey}`, {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 0,
        maxZoom: 22,
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener noreferrer">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
        crossOrigin: true
      });
      baseLayer.addTo(map);
      baseTileLayerRef.current = baseLayer;
    } else {
      // Fallback to OpenStreetMap if key is not provided
      const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
        maxZoom: 19
      });
      baseLayer.addTo(map);
      baseTileLayerRef.current = baseLayer;
    }
  }, [theme]);

  // 2. Update NASA GIBS Tile Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (gibsTileLayerRef.current) {
      map.removeLayer(gibsTileLayerRef.current);
      gibsTileLayerRef.current = null;
    }

    if (selectedLayerId) {
      const tileUrl = getGibsTileUrl(selectedLayerId, selectedDate);
      const activeLayer = GIBS_LAYERS.find(l => l.id === selectedLayerId);
      const maxNativeZoom = activeLayer?.maxZoom || 7;
      const attribution = activeLayer?.isNisar
        ? '&copy; <a href="https://gibs.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA EOSDIS GIBS</a> | <a href="https://nisar.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA-ISRO NISAR</a>'
        : '&copy; <a href="https://gibs.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA EOSDIS GIBS</a>';

      const gibsLayer = L.tileLayer(tileUrl, {
        opacity: opacity,
        zIndex: 50,
        tileSize: 256,
        maxNativeZoom: maxNativeZoom,
        maxZoom: 19,
        attribution: attribution
      });

      // Gracefully handle unavailable dates/tiles without breaking Leaflet map
      gibsLayer.on('tileerror', () => {
        // Transparent fallback: suppress error logs for unavailable swaths
      });

      gibsLayer.addTo(map);
      gibsTileLayerRef.current = gibsLayer;
    }
  }, [selectedLayerId, selectedDate]);

  // 3. Update Opacity
  useEffect(() => {
    if (gibsTileLayerRef.current) {
      gibsTileLayerRef.current.setOpacity(opacity);
    }
  }, [opacity]);

  // 3b. Render Monitored Study Areas Footprints (FastAPI Backend)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (studyAreasLayerRef.current) {
      map.removeLayer(studyAreasLayerRef.current);
      studyAreasLayerRef.current = null;
    }

    if (!studyAreas || studyAreas.length === 0) return;

    const group = L.featureGroup();
    studyAreas.forEach(area => {
      if (Array.isArray(area.bounding_box) && area.bounding_box.length === 4) {
        const [minLon, minLat, maxLon, maxLat] = area.bounding_box;
        const bounds = [[minLat, minLon], [maxLat, maxLon]];
        const rect = L.rectangle(bounds, {
          color: '#3D5AFE',
          weight: 1.5,
          dashArray: '4, 4',
          fillColor: '#3D5AFE',
          fillOpacity: 0.08
        });
        rect.bindTooltip(`📍 ${area.name}<br/><span style="font-size:10px;color:#8e9bb4">Click to select study area</span>`, {
          sticky: true
        });
        rect.on('click', () => {
          if (onSelectStudyArea) onSelectStudyArea(area);
        });
        rect.addTo(group);
      }
    });

    group.addTo(map);
    studyAreasLayerRef.current = group;
  }, [studyAreas, onSelectStudyArea]);

  // 3c. Render Change Mask GeoJSON Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (changeMaskLayerRef.current) {
      map.removeLayer(changeMaskLayerRef.current);
      changeMaskLayerRef.current = null;
    }

    if (!analysisData?.changeMaskGeoJson) return;

    try {
      const geoJsonLayer = L.geoJSON(analysisData.changeMaskGeoJson, {
        style: () => ({
          color: '#FF6B35',
          weight: 2,
          opacity: 0.95,
          fillColor: '#00F0FF',
          fillOpacity: 0.5
        }),
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          const title = p.feature_id || p.detection_type || 'Detected Surface Water';
          const area = p.area_sq_km ? `${p.area_sq_km.toFixed(2)} km²` : 'N/A';
          const ratio = p.backscatter_ratio_db ? `${p.backscatter_ratio_db.toFixed(1)} dB` : 'N/A';
          const conf = p.confidence || 'ILLUSTRATIVE';
          layer.bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; color: #0F172A; line-height: 1.4;">
              <strong style="color: #FF6B35;">🛰️ ${title}</strong><br/>
              <strong>Area:</strong> ${area}<br/>
              <strong>Backscatter Ratio:</strong> ${ratio}<br/>
              <strong>Status:</strong> ${conf} (Demo)
            </div>
          `);
        }
      });

      geoJsonLayer.addTo(map);
      changeMaskLayerRef.current = geoJsonLayer;

      // Fit map view to the change mask
      const bounds = geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
      }
    } catch (err) {
      console.error('Error rendering change mask GeoJSON on map:', err);
    }
  }, [analysisData?.changeMaskGeoJson]);

  // 4. Render Active Area Selection Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (activeLayerRef.current) {
      map.removeLayer(activeLayerRef.current);
      activeLayerRef.current = null;
    }

    if (!selectedArea) return;

    let layer = null;
    if (selectedArea.type === 'Point Radius' && selectedArea.center && selectedArea.radiusKm) {
      layer = L.circle([selectedArea.center.lat, selectedArea.center.lon], {
        radius: selectedArea.radiusKm * 1000,
        ...SELECTION_STYLE
      });
    } else if (selectedArea.bounds) {
      layer = L.rectangle(selectedArea.bounds, SELECTION_STYLE);
    } else if (selectedArea.latlngs) {
      layer = L.polygon(selectedArea.latlngs, SELECTION_STYLE);
    }

    if (layer) {
      layer.addTo(map);
      activeLayerRef.current = layer;

      // Center map on selected area if it was selected via study area button
      if (selectedArea.type === 'Study Area Bounding Box' && selectedArea.bounds) {
        map.fitBounds(selectedArea.bounds, { padding: [40, 40], maxZoom: 12 });
      }
    }
  }, [selectedArea]);

  // 5. Drawing Event Handlers
  const handleMapClick = useCallback((e) => {
    const map = mapRef.current;
    if (!map || !drawMode) return;

    if (drawMode === 'point') {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;
      const radiusKm = pointRadiusKm;
      const areaKm2 = Math.round(Math.PI * radiusKm * radiusKm);

      onSelectArea({
        type: 'Point Radius',
        center: { lat, lon },
        radiusKm: radiusKm,
        areaKm2: areaKm2
      });
      onSetDrawMode(null);
    } else if (drawMode === 'rectangle') {
      if (!drawStateRef.current.startLatLng) {
        // First corner
        drawStateRef.current.startLatLng = e.latlng;
      } else {
        // Second corner (finish)
        const bounds = L.latLngBounds(drawStateRef.current.startLatLng, e.latlng);
        const area = Math.round(calculateRectangleArea(bounds));
        const center = bounds.getCenter();

        if (previewLayerRef.current) {
          map.removeLayer(previewLayerRef.current);
          previewLayerRef.current = null;
        }

        onSelectArea({
          type: 'Rectangle',
          bounds: bounds,
          center: { lat: center.lat, lon: center.lng },
          areaKm2: area
        });

        drawStateRef.current.startLatLng = null;
        onSetDrawMode(null);
      }
    } else if (drawMode === 'polygon') {
      const points = drawStateRef.current.points;
      
      // Check if user clicked close to the first point to close polygon
      if (points.length >= 2) {
        const first = points[0];
        const dist = map.distance(first, e.latlng);
        if (dist < 30000 || points.length >= 12) { // 30km tolerance or max points
          const area = Math.round(calculatePolygonArea(points));
          const poly = L.polygon(points);
          const center = poly.getBounds().getCenter();

          if (previewLayerRef.current) {
            map.removeLayer(previewLayerRef.current);
            previewLayerRef.current = null;
          }

          onSelectArea({
            type: 'Polygon',
            latlngs: points,
            center: { lat: center.lat, lon: center.lng },
            areaKm2: area
          });

          drawStateRef.current.points = [];
          onSetDrawMode(null);
          return;
        }
      }

      points.push(e.latlng);
      
      // Update preview
      if (previewLayerRef.current) {
        map.removeLayer(previewLayerRef.current);
      }
      previewLayerRef.current = L.polyline(points, PREVIEW_STYLE).addTo(map);
    }
  }, [drawMode, pointRadiusKm, onSelectArea, onSetDrawMode]);

  const handleMouseMove = useCallback((e) => {
    const map = mapRef.current;
    if (!map || !drawMode) return;

    if (drawMode === 'rectangle' && drawStateRef.current.startLatLng) {
      const bounds = L.latLngBounds(drawStateRef.current.startLatLng, e.latlng);
      if (previewLayerRef.current) {
        map.removeLayer(previewLayerRef.current);
      }
      previewLayerRef.current = L.rectangle(bounds, PREVIEW_STYLE).addTo(map);
    } else if (drawMode === 'polygon' && drawStateRef.current.points.length > 0) {
      const tempPoints = [...drawStateRef.current.points, e.latlng];
      if (previewLayerRef.current) {
        map.removeLayer(previewLayerRef.current);
      }
      previewLayerRef.current = L.polyline(tempPoints, PREVIEW_STYLE).addTo(map);
    }
  }, [drawMode]);

  // Bind drawing events to Leaflet
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.on('click', handleMapClick);
    map.on('mousemove', handleMouseMove);

    // Dynamic cursor depending on drawing mode
    const container = mapContainerRef.current;
    if (container) {
      container.style.cursor = drawMode ? 'crosshair' : 'grab';
    }

    return () => {
      map.off('click', handleMapClick);
      map.off('mousemove', handleMouseMove);
    };
  }, [drawMode, handleMapClick, handleMouseMove]);

  // Handle Search Execution
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setGeoNotice(null);
    try {
      const results = await searchLocation(searchQuery);
      setSearchResults(results);
      if (results.length === 0) {
        setGeoNotice('No matching locations found.');
      }
    } catch {
      setGeoNotice('Failed to search location.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result) => {
    const map = mapRef.current;
    if (!map) return;

    map.setView([result.lat, result.lon], 9, { animate: true });
    setSearchResults([]);
    setSearchQuery(result.name);

    // Auto-select as point radius
    onSelectArea({
      type: 'Point Radius',
      center: { lat: result.lat, lon: result.lon },
      radiusKm: pointRadiusKm,
      areaKm2: Math.round(Math.PI * pointRadiusKm * pointRadiusKm)
    });
  };

  return (
    <div className="map-view-wrapper" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Search Bar (Top Left) */}
      <div className="search-bar-container" style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 400 }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              className="search-input"
              placeholder="Search country, city, or coordinates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search geographic location"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="btn btn-ghost" 
                style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', padding: '2px 6px', fontSize: '10px' }}
                onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSearching}>
            {isSearching ? '...' : '🔍 Search'}
          </button>
        </form>

        {geoNotice && (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', backgroundColor: 'var(--surface)', padding: '4px 8px', borderRadius: '4px' }}>
            {geoNotice}
          </div>
        )}

        {searchResults.length > 0 && (
          <ul className="search-results-dropdown" role="listbox">
            {searchResults.map((item, idx) => (
              <li 
                key={idx} 
                className="search-result-item"
                onClick={() => handleSelectSearchResult(item)}
                role="option"
                aria-selected={false}
                tabIndex={0}
              >
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  Lat: {item.lat.toFixed(2)}°, Lon: {item.lon.toFixed(2)}°
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* MapTiler Missing Notice (Collapsible Banner) */}
      {showKeyWarning && (
        <div style={{
          position: 'absolute',
          top: '72px',
          left: '16px',
          zIndex: 400,
          backgroundColor: 'rgba(21, 28, 59, 0.95)',
          border: '1px solid var(--accent)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12px',
          maxWidth: '460px',
          backdropFilter: 'blur(6px)'
        }} role="alert">
          <span style={{ fontSize: '18px' }}>🗺️</span>
          <div style={{ flex: 1, color: 'var(--text)' }}>
            <strong>MapTiler Key Missing:</strong> To view the high-contrast <code>dataviz-dark</code> basemap, add <code>VITE_MAPTILER_KEY</code> in <code>.env</code>. Falling back to OpenStreetMap.
          </div>
          <button 
            className="btn btn-ghost" 
            style={{ padding: '2px 6px', fontSize: '12px', color: 'var(--text-muted)' }}
            onClick={() => setShowKeyWarning(false)}
            aria-label="Dismiss key warning"
          >
            ✕
          </button>
        </div>
      )}

      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="leaflet-map" style={{ width: '100%', height: '100%' }} />

      {/* Visible Scientific Notice for NISAR L-band GCOV Browse Layer */}
      {(() => {
        const activeGibs = GIBS_LAYERS.find(l => l.id === selectedLayerId);
        if (!activeGibs?.isNisar) return null;
        const is2018 = selectedDate && selectedDate.startsWith('2018');
        return (
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 400,
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            border: '1px solid #3B82F6',
            borderRadius: '8px',
            padding: '10px 14px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
            backdropFilter: 'blur(8px)',
            maxWidth: '580px',
            width: 'calc(100% - 32px)',
            color: '#E2E8F0',
            fontSize: '11px',
            lineHeight: '1.4'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#60A5FA' }}>
                <span>📡</span>
                <span>NASA-ISRO NISAR L-band GCOV — Browse Visualization</span>
              </div>
              <span style={{ 
                fontSize: '9px', 
                padding: '2px 6px', 
                borderRadius: '4px', 
                backgroundColor: 'rgba(234, 179, 8, 0.2)', 
                color: '#FACC15',
                border: '1px solid rgba(234, 179, 8, 0.4)',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}>
                PROVISIONAL STREAM (SDS P05036)
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: '#94A3B8' }}>
              Normalized radar backscatter browse visualization via NASA EOSDIS GIBS. <strong>Visualization only</strong>; not raw HDF5 observation pixels. Kept strictly separate from Sentinel-1 C-band processing.
            </div>
            {is2018 && (
              <div style={{ marginTop: '6px', padding: '4px 8px', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#FCA5A5', fontSize: '10px' }}>
                ⚠️ NISAR has no historical observations for 2018 (mission valid 2025–2026). Selected date <code>{selectedDate}</code> has no imagery. Switch date to <code>2026-11-10</code> to view active NISAR swaths.
              </div>
            )}
          </div>
        );
      })()}

      {/* Floating Active Layer Color Legend */}
      {(() => {
        const activeGibs = GIBS_LAYERS.find(l => l.id === selectedLayerId);
        if (!activeGibs) return null;
        return (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '16px',
            zIndex: 400,
            backgroundColor: 'rgba(21, 28, 59, 0.94)',
            border: '1px solid var(--surface-border)',
            borderRadius: '8px',
            padding: '8px 12px',
            boxShadow: 'var(--shadow-md)',
            backdropFilter: 'blur(8px)',
            minWidth: '220px',
            pointerEvents: 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--text)', marginBottom: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{activeGibs.icon}</span>
                <span>{activeGibs.name}</span>
              </div>
              {activeGibs.isNisar && (
                <span style={{ fontSize: '9px', color: '#FACC15', backgroundColor: 'rgba(234, 179, 8, 0.2)', padding: '1px 5px', borderRadius: '3px' }}>
                  Browse Only
                </span>
              )}
            </div>
            {activeGibs.gradient && (
              <>
                <div style={{
                  height: '6px',
                  borderRadius: '3px',
                  background: activeGibs.gradient,
                  marginBottom: '4px'
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)' }}>
                  <span>{activeGibs.legendMin}</span>
                  <span>{activeGibs.legendMax}</span>
                </div>
              </>
            )}
          </div>
        );
      })()}

      {/* Floating Active Selection Badge (Bottom Left) */}
      {selectedArea && (
        <div className="selection-status-badge">
          <div className="selection-info">
            <span className="selection-title">Selected Region ({selectedArea.type})</span>
            <span className="selection-details">
              Area: {selectedArea.areaKm2.toLocaleString()} km²
            </span>
            <span className="selection-coords">
              Lat: {selectedArea.center.lat.toFixed(3)}°, Lon: {selectedArea.center.lon.toFixed(3)}°
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn btn-outline" 
              style={{ padding: '6px 10px', fontSize: '11px' }}
              onClick={onClearArea}
              disabled={isAnalyzing}
            >
              Clear
            </button>
            <button 
              className="btn btn-accent" 
              style={{ padding: '6px 14px', fontSize: '11px' }}
              onClick={onAnalyseArea}
              disabled={isAnalyzing || !!validationError}
            >
              Analyse ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
