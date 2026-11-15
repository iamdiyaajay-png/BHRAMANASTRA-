import React from 'react';

export default function StatCards({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="stat-cards-grid">
      {stats.map((s, idx) => {
        let trendIcon = '•';
        let trendClass = 'neutral';

        if (s.trend === 'up') {
          trendIcon = '▲';
          trendClass = 'up';
        } else if (s.trend === 'down') {
          trendIcon = '▼';
          trendClass = 'down';
        }

        return (
          <div key={idx} className="stat-card" tabIndex={0} aria-label={`${s.label}: ${s.value}`}>
            <div className="stat-header">
              <span className="stat-label">{s.label}</span>
              {s.change !== 0 && (
                <span className={`stat-change ${trendClass}`}>
                  <span>{trendIcon}</span> {Math.abs(s.change)}%
                </span>
              )}
            </div>
            <div className="stat-value">{s.value}</div>
          </div>
        );
      })}
    </div>
  );
}
