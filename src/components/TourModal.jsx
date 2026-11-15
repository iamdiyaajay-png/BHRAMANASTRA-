import React, { useState, useEffect } from 'react';

export default function TourModal({ isOpen, onClose }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      step: 'Step 1 of 3',
      title: 'Choose a Satellite Layer & Date',
      description: 'Explore Earth with NASA Global Imagery Browse Services (GIBS). Choose between Surface Temperature, Precipitation, Vegetation Index (NDVI), Air Quality (AOD), or True Color satellite imagery. Adjust layer opacity and travel back in time with the date picker.'
    },
    {
      step: 'Step 2 of 3',
      title: 'Select Any Area on the Globe',
      description: 'Use the interactive selection toolbar to draw a Rectangle, freeform Polygon, or click a Single Point with an adjustable radius (5km - 100km). The area highlights in radiant accent orange with live area (km²) and coordinate measurements.'
    },
    {
      step: 'Step 3 of 3',
      title: 'Analyse & Visualize NASA Climate Data',
      description: 'Click "Analyse Area" to fetch 30-day meteorological time series and statistics directly from the NASA POWER API. Examine trends with line and comparison charts, read plain-language insight summaries, and export data as PNG or CSV.'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const current = slides[slide];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      <div className="tour-modal">
        <span className="tour-step-tag">{current.step}</span>
        <h3 id="tour-title" className="tour-title">{current.title}</h3>
        <p className="tour-description">{current.description}</p>

        <div className="tour-footer">
          <div className="tour-dots">
            {slides.map((_, i) => (
              <span key={i} className={`tour-dot ${slide === i ? 'active' : ''}`} />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {slide > 0 && (
              <button className="btn btn-outline" onClick={() => setSlide(s => s - 1)}>
                Previous
              </button>
            )}

            {slide < slides.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setSlide(s => s + 1)}>
                Next
              </button>
            ) : (
              <button className="btn btn-accent" onClick={onClose}>
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
