import React from 'react';

export default function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: 'Pick Layer & Date' },
    { num: 2, label: 'Select Area' },
    { num: 3, label: 'View Insights' }
  ];

  return (
    <nav className="step-flow" aria-label="Workflow Steps">
      {steps.map((s, index) => {
        const isActive = currentStep === s.num;
        const isCompleted = currentStep > s.num;

        return (
          <React.Fragment key={s.num}>
            <div 
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="step-num">{isCompleted ? '✓' : s.num}</span>
              <span>{s.label}</span>
            </div>
            {index < steps.length - 1 && <span className="step-divider">›</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
