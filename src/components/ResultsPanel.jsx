import React from 'react';
import StatCards from './StatCards';
import ChartsView from './ChartsView';
import { apiClient } from '../services/apiClient';

export default function ResultsPanel({ 
  analysisData, 
  isAnalyzing, 
  selectedArea,
  matchedStudyArea,
  validationError,
  onTriggerAnalysis,
  theme = 'dark'
}) {
  const isLight = theme === 'light';

  // Helper for evidence label badge color
  const getEvidenceBadgeStyle = (label) => {
    const l = (label || '').toLowerCase();
    if (l === 'supported') {
      return {
        bg: 'rgba(16, 185, 129, 0.18)',
        border: '1px solid var(--success)',
        color: 'var(--success)'
      };
    }
    if (l === 'inconclusive') {
      return {
        bg: 'rgba(245, 158, 11, 0.18)',
        border: '1px solid var(--warning)',
        color: 'var(--warning)'
      };
    }
    return {
      bg: 'rgba(92, 104, 130, 0.25)',
      border: '1px solid var(--text-dim)',
      color: 'var(--text-muted)'
    };
  };

  return (
    <div className="panel-section" style={{ borderBottom: 'none' }}>
      <div className="panel-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>📊 Step 3: Investigation Results &amp; Ledger</span>
        {analysisData && (
          <span className="data-source-pill live">
            <span className="data-dot" />
            FastAPI Backend Active
          </span>
        )}
      </div>

      {/* 1. Loading State */}
      {isAnalyzing && (
        <div style={{ padding: '24px 0', textAlign: 'center' }}>
          <div className="skeleton" style={{ height: '70px', marginBottom: '12px' }} />
          <div className="skeleton" style={{ height: '140px', marginBottom: '12px' }} />
          <div className="skeleton" style={{ height: '90px' }} />
          <p style={{ marginTop: '14px', fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>
            🛰️ Querying FastAPI backend and running Beat Test temporal evaluation...
          </p>
        </div>
      )}

      {/* 2. Validation Error / Unsupported Area State */}
      {!isAnalyzing && validationError && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--danger)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px',
          marginTop: '12px'
        }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <div>
              <h4 style={{ color: 'var(--danger)', fontSize: '13px', marginBottom: '6px', fontWeight: 700 }}>
                Area Not Supported for Satellite SAR Investigation
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--text)', lineHeight: 1.5 }}>
                {validationError}
              </p>
              <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <strong>Tip:</strong> The Sentinel-1 change detection pipeline operates strictly within monitored study areas with calibrated SAR passes. Select Kerala, Valencia, or Wayanad on the map.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Empty State (No Analysis Run Yet, Valid Area Selected) */}
      {!isAnalyzing && !analysisData && !validationError && (
        <div className="empty-state">
          <div className="empty-icon">🛰️</div>
          <h3>Ready for Radar Evidence Analysis</h3>
          <p>
            {matchedStudyArea 
              ? `Selected: ${matchedStudyArea.name}. Click "Run SAR Investigation" to initialize investigation and evaluate Sentinel-1 SAR change evidence.`
              : 'Click on the map or select a monitored region (Kerala, Valencia, Wayanad) to initialize a surface change investigation.'}
          </p>
          {matchedStudyArea && (
            <button 
              className="btn btn-accent" 
              style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
              onClick={onTriggerAnalysis}
            >
              Run SAR Investigation ➔
            </button>
          )}
        </div>
      )}

      {/* 4. Analysis Results View */}
      {!isAnalyzing && analysisData && (
        <div>
          {/* Canonical Provenance Caution Banner (DEC-04) */}
          <div style={{
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid var(--warning)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            marginBottom: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px' }}>🛡️</span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 800, 
                color: 'var(--warning)', 
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                PROVENANCE: {analysisData.data_provenance || 'ILLUSTRATIVE_DEMO_RECORD'}
              </span>
            </div>
            <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
              Demonstrative SAR radar record. Member 1 live scientific satellite pipeline connection is pending. Data fixtures are illustrative and must not be cited as real observations.
            </p>
          </div>

          {/* Investigation Metadata & Evidence Badges */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                ID: {analysisData.investigation_id}
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '10px',
                backgroundColor: 'rgba(61, 90, 254, 0.15)',
                color: 'var(--primary)',
                border: '1px solid var(--primary)'
              }}>
                STATUS: {analysisData.status || 'COMPLETED'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {/* Evidence Label */}
              <div style={{
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
                ...getEvidenceBadgeStyle(analysisData.evidence_label)
              }}>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', opacity: 0.8 }}>Evidence Label</div>
                <div style={{ fontSize: '13px', fontWeight: 800, marginTop: '2px' }}>
                  {analysisData.evidence_label || 'Unverified'}
                </div>
              </div>

              {/* Verification Status */}
              <div style={{
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text)'
              }}>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Verification</div>
                <div style={{ fontSize: '11px', fontWeight: 700, marginTop: '2px' }}>
                  {analysisData.verification_status || 'UNVERIFIED'}
                </div>
              </div>

              {/* Beat Test Status */}
              <div style={{
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text)'
              }}>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Beat Test</div>
                <div style={{ fontSize: '11px', fontWeight: 700, marginTop: '2px', color: 'var(--accent)' }}>
                  {analysisData.beat_test_result || 'insufficient'}
                </div>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <StatCards stats={analysisData.stats} />

          {/* Regional Insight Box */}
          {analysisData.insight && (
            <div className="insight-box" role="region" aria-label="Regional Analysis Insight" style={{ marginTop: '12px' }}>
              <span className="insight-icon" aria-hidden="true">💡</span>
              <div className="insight-text">
                <h4>Temporal Evaluation Rationale</h4>
                <p>{analysisData.insight}</p>
              </div>
            </div>
          )}

          {/* Reasons for Label */}
          {Array.isArray(analysisData.reasons_for_label) && analysisData.reasons_for_label.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <h5 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                Scientific Decision Rationale:
              </h5>
              <ul style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--text)', lineHeight: 1.5 }}>
                {analysisData.reasons_for_label.map((reason, idx) => (
                  <li key={idx} style={{ marginBottom: '3px' }}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Known Limitations */}
          {Array.isArray(analysisData.known_limitations) && analysisData.known_limitations.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <h5 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                Known Uncertainties &amp; Limitations:
              </h5>
              <ul style={{ paddingLeft: '16px', fontSize: '10.5px', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                {analysisData.known_limitations.map((limit, idx) => (
                  <li key={idx} style={{ marginBottom: '2px' }}>{limit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Available Map Layers Indicator */}
          <div style={{
            marginTop: '14px',
            padding: '10px 12px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>
                🗺️ Vector Change Mask:
              </span>
              <span style={{
                color: analysisData.hasChangeMask ? 'var(--success)' : 'var(--text-muted)',
                fontWeight: 600
              }}>
                {analysisData.hasChangeMask ? '✓ Active on Map' : '○ Not available'}
              </span>
            </div>
            {analysisData.hasChangeMask && (
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                EPSG:4326 GeoJSON polygons rendered directly on Leaflet map viewport.
              </div>
            )}
          </div>

          {/* Action Links: Report & Ledger Download */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '14px' }}>
            <a 
              href={apiClient.getInvestigationReportUrl(analysisData.investigation_id)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ textAlign: 'center', justifyContent: 'center', fontSize: '11px', textDecoration: 'none' }}
            >
              📄 Printable Report
            </a>
            <a 
              href={apiClient.getInvestigationLedgerDownloadUrl(analysisData.investigation_id)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ textAlign: 'center', justifyContent: 'center', fontSize: '11px', textDecoration: 'none' }}
            >
              💾 Evidence Ledger
            </a>
          </div>

          {/* Optional Time-Series Chart */}
          {analysisData.timeSeries && analysisData.timeSeries.length > 0 && (
            <div style={{ marginTop: '14px' }}>
              <ChartsView 
                timeSeries={analysisData.timeSeries} 
                comparison={analysisData.comparison}
                layerCategory="Radar Surface Water"
                theme={theme}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
