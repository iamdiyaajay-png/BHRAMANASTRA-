import React from 'react';

export default function AreaSelectionToolbar({
  drawMode,
  onSetDrawMode,
  pointRadiusKm,
  onSetPointRadiusKm,
  selectedArea,
  onClearArea,
  onAnalyseArea,
  validationError,
  isAnalyzing,
  studyAreas = [],
  matchedStudyArea = null,
  onSelectStudyArea = () => {},
  referenceDate = '',
  comparisonDate = '',
  onReferenceDateChange = () => {},
  onComparisonDateChange = () => {}
}) {
  return (
    <div className="panel-section">
      <div className="panel-section-title">
        <span>📐 Step 2: Monitored Area &amp; Dates</span>
      </div>

      {/* Preset Monitored Study Areas (Direct Backend Integration) */}
      {studyAreas && studyAreas.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
            🎯 Monitored Sentinel-1 SAR Regions:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {studyAreas.map(area => {
              const isSelected = matchedStudyArea?.id === area.id;
              return (
                <button
                  key={area.id}
                  className={`btn ${isSelected ? 'btn-accent' : 'btn-outline'}`}
                  style={{
                    fontSize: '11px',
                    padding: '8px 10px',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    backgroundColor: isSelected ? 'var(--accent)' : 'var(--surface)'
                  }}
                  onClick={() => onSelectStudyArea(area)}
                  disabled={isAnalyzing}
                >
                  <span style={{ fontSize: '14px' }}>📍</span>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {area.name}
                    </div>
                    <div style={{ fontSize: '9.5px', opacity: 0.85, whiteSpace: 'nowrap' }}>
                      Type: {area.phenomenon_type} • Behavior: {area.expected_behavior}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Custom Map Drawing Tools */}
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
        ✏️ Or Define Custom Boundary on Map:
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '10px' }}>
        <button 
          className={`tool-btn ${drawMode === 'rectangle' ? 'active' : ''}`}
          onClick={() => onSetDrawMode(drawMode === 'rectangle' ? null : 'rectangle')}
          title="Click and drag or select two corners to define a rectangle"
          aria-pressed={drawMode === 'rectangle'}
          disabled={isAnalyzing}
        >
          <span>⬛</span> Rectangle
        </button>

        <button 
          className={`tool-btn ${drawMode === 'polygon' ? 'active' : ''}`}
          onClick={() => onSetDrawMode(drawMode === 'polygon' ? null : 'polygon')}
          title="Click multiple points on the map to draw a custom boundary polygon"
          aria-pressed={drawMode === 'polygon'}
          disabled={isAnalyzing}
        >
          <span>⬡</span> Polygon
        </button>

        <button 
          className={`tool-btn ${drawMode === 'point' ? 'active' : ''}`}
          onClick={() => onSetDrawMode(drawMode === 'point' ? null : 'point')}
          title="Click a point to place a circular radius buffer"
          aria-pressed={drawMode === 'point'}
          disabled={isAnalyzing}
        >
          <span>📍</span> Point + R
        </button>
      </div>

      {drawMode === 'point' && (
        <div className="radius-slider-group" style={{ backgroundColor: 'var(--bg)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text)' }}>
            <span>Radius Buffer:</span>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{pointRadiusKm} km</span>
          </div>
          <input 
            type="range"
            min="5"
            max="150"
            step="5"
            value={pointRadiusKm}
            onChange={(e) => onSetPointRadiusKm(parseInt(e.target.value, 10))}
            className="radius-slider"
            aria-label="Selection Point Radius in Kilometers"
          />
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            Click anywhere on the map to drop a {pointRadiusKm} km radius circle.
          </span>
        </div>
      )}

      {drawMode && (
        <div style={{ 
          fontSize: '11px', 
          color: 'var(--accent)', 
          backgroundColor: 'rgba(255, 107, 53, 0.08)', 
          padding: '8px 12px', 
          borderRadius: '4px',
          border: '1px dashed var(--accent)',
          marginTop: '8px'
        }}>
          {drawMode === 'rectangle' && '👉 Click and drag on the map to define your rectangular bounding box.'}
          {drawMode === 'polygon' && '👉 Click on the map to place vertices. Click the initial point or double-click to finish.'}
          {drawMode === 'point' && '👉 Click anywhere on the map to place your circular area.'}
        </div>
      )}

      {/* Selected Area Summary & Investigation Date Setup */}
      {selectedArea && (
        <div style={{ 
          marginTop: '12px', 
          backgroundColor: 'var(--bg)', 
          border: '1px solid var(--accent)', 
          borderRadius: 'var(--radius-sm)', 
          padding: '12px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Selection
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Mode: {selectedArea.type}
            </span>
          </div>

          {matchedStudyArea ? (
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid var(--success)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px',
              marginBottom: '8px',
              fontSize: '11px',
              color: 'var(--text)'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--success)', marginBottom: '2px' }}>
                ✓ Supported Monitored Area: {matchedStudyArea.name}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Satellite: Copernicus Sentinel-1 SAR (C-band)
              </div>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--danger)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px',
              marginBottom: '8px',
              fontSize: '11px',
              color: 'var(--danger)'
            }}>
              <strong>⚠️ Unsupported Area:</strong> This location does not overlap a registered study area. The current investigation API requires a registered study area (Kerala, Valencia, Wayanad).
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated Area:</span>
            <span style={{ fontSize: '16px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)' }}>
              {selectedArea.areaKm2.toLocaleString()} km²
            </span>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
            Center: {selectedArea.center.lat.toFixed(4)}°, {selectedArea.center.lon.toFixed(4)}°
          </div>

          {/* Date Range Selection for Investigation */}
          {matchedStudyArea && (
            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--surface-border)' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
                📅 Sentinel-1 SAR Acquisition Pair:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                    Reference Date (Pre-event):
                  </label>
                  <input
                    type="date"
                    className="search-input"
                    style={{ height: '30px', padding: '0 6px', fontSize: '11px', width: '100%' }}
                    value={referenceDate}
                    onChange={(e) => onReferenceDateChange(e.target.value)}
                    disabled={isAnalyzing}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                    Comparison Date (Peak):
                  </label>
                  <input
                    type="date"
                    className="search-input"
                    style={{ height: '30px', padding: '0 6px', fontSize: '11px', width: '100%' }}
                    value={comparisonDate}
                    onChange={(e) => onComparisonDateChange(e.target.value)}
                    disabled={isAnalyzing}
                  />
                </div>
              </div>
            </div>
          )}

          {validationError && (
            <div style={{ 
              marginTop: '8px', 
              color: 'var(--danger)', 
              fontSize: '11px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px' 
            }} role="alert">
              <span>⚠️</span> {validationError}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button 
              className="btn btn-outline" 
              style={{ flex: 1 }}
              onClick={onClearArea}
              disabled={isAnalyzing}
            >
              Clear
            </button>
            <button 
              className="btn btn-accent" 
              style={{ flex: 2 }}
              onClick={onAnalyseArea}
              disabled={isAnalyzing || !!validationError || !matchedStudyArea}
            >
              {isAnalyzing ? (
                <>
                  <span className="spinner" aria-hidden="true">⏳</span> Analyzing...
                </>
              ) : (
                'Run SAR Investigation ➔'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
