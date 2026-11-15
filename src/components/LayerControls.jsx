import React from 'react';
import { GIBS_LAYERS } from '../services/gibsLayers';

export default function LayerControls({ 
  selectedLayerId, 
  onSelectLayer, 
  selectedDate, 
  onDateChange, 
  opacity, 
  onOpacityChange 
}) {
  return (
    <div className="panel-section">
      <div className="panel-section-title">
        <span>🛰️ Step 1: Satellite Layer &amp; Date</span>
      </div>

      <div className="layer-card-list">
        {GIBS_LAYERS.map(layer => {
          const isSelected = selectedLayerId === layer.id;
          return (
            <div 
              key={layer.id}
              className={`layer-card ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectLayer(layer.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectLayer(layer.id); }}
              aria-pressed={isSelected}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div className="layer-info">
                  <h4>
                    <span style={{ marginRight: '6px' }}>{layer.icon}</span>
                    {layer.name}
                  </h4>
                  <p>{layer.description}</p>
                  {layer.dataTier && (
                    <div style={{ marginTop: '4px' }}>
                      <span style={{ 
                        fontSize: '9px', 
                        padding: '1px 5px', 
                        borderRadius: '3px', 
                        backgroundColor: 'rgba(234, 179, 8, 0.15)', 
                        color: '#FACC15',
                        border: '1px solid rgba(234, 179, 8, 0.3)',
                        fontWeight: 600
                      }}>
                        {layer.dataTier}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <span className={`data-source-pill ${isSelected ? 'live' : ''}`} style={{ fontSize: '10px' }}>
                    {layer.unit}
                  </span>
                </div>
              </div>

              {/* Color gradient scale for selected tool */}
              {isSelected && layer.gradient && (
                <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{
                    height: '8px',
                    borderRadius: '4px',
                    background: layer.gradient,
                    marginBottom: '4px'
                  }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <span>{layer.legendMin}</span>
                    <span>{layer.legendMax}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="layer-slider-container" style={{ marginTop: '12px' }}>
        <div className="slider-label">
          <span>Observation Date</span>
          <span style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{selectedDate}</span>
        </div>
        <input 
          type="date"
          className="search-input"
          style={{ height: '34px', padding: '0 10px', fontSize: '12px' }}
          value={selectedDate}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => onDateChange(e.target.value)}
          aria-label="Satellite Observation Date"
        />
        {selectedLayerId === 'NISAR_L2_Geocoded_Polarimetric_Covariance' && (
          <div style={{ marginTop: '8px', padding: '6px 10px', borderRadius: '6px', backgroundColor: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.25)', fontSize: '11px', color: '#93C5FD', lineHeight: '1.4' }}>
            <span><strong>NISAR Coverage:</strong> Operational archive begins late 2025. Verified pass over Kerala study basin is <strong>2026-11-10</strong>.</span>
            {selectedDate !== '2026-11-10' && (
              <div style={{ marginTop: '4px' }}>
                <button 
                  type="button"
                  className="btn btn-outline" 
                  style={{ padding: '2px 8px', fontSize: '10px', height: '22px' }}
                  onClick={() => onDateChange('2026-11-10')}
                >
                  Set to 2026-11-10
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="layer-slider-container" style={{ marginTop: '8px' }}>
        <div className="slider-label">
          <span>Layer Opacity</span>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{Math.round(opacity * 100)}%</span>
        </div>
        <input 
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
          className="radius-slider"
          style={{ width: '100%' }}
          aria-label="Satellite Imagery Layer Opacity"
        />
      </div>
    </div>
  );
}
