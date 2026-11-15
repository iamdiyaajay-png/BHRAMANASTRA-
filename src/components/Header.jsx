import React from 'react';
import StepIndicator from './StepIndicator';

export default function Header({ 
  currentStep, 
  onOpenTour, 
  isPanelOpen, 
  onTogglePanel,
  theme,
  onToggleTheme
}) {
  return (
    <header className="app-header">
      <div className="brand-container">
        <div className="brand-icon" aria-hidden="true">
          B
        </div>
        <div className="brand-text">
          <h1>BHRAMANASTHRA</h1>
          <p>NASA Space Apps Challenge 2026 • Earth Observation Explorer</p>
        </div>
      </div>

      <div className="header-center">
        <StepIndicator currentStep={currentStep} />
      </div>

      <div className="header-actions">
        {/* Theme Toggle Button */}
        <button 
          className="btn btn-outline"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <button 
          className="btn btn-outline" 
          onClick={onOpenTour}
          title="Open interactive quick tour"
          aria-label="App Quick Tour and Guide"
        >
          <span aria-hidden="true">💡</span> Quick Tour
        </button>

        <button 
          className="btn btn-primary" 
          onClick={onTogglePanel}
          title={isPanelOpen ? "Collapse Data Panel" : "Expand Data Panel"}
          aria-label="Toggle Side Data Panel"
        >
          <span>{isPanelOpen ? 'Hide Panel ➔' : '⮜ Show Panel'}</span>
        </button>
      </div>
    </header>
  );
}
