/**
 * BHRAMANASTHRA Mock & Fallback Data Fixture
 * 
 * STRICT NOTICE:
 * This file contains SIMULATED, clearly labelled fallback data used ONLY when
 * the live NASA POWER API is unreachable, offline, or rate-limited.
 * It is never presented as actual real-time satellite telemetry without clear labels.
 */

export const IS_MOCK_FALLBACK = true;

/**
 * Generates synthetic daily time series for 30 days anchored around lat/lon
 */
export function generateFallbackData(lat, lon, layerCategory = 'Temperature') {
  const dataPoints = [];
  const today = new Date();
  
  // Base climate values inferred from latitude
  const absLat = Math.abs(lat);
  const baseTemp = 30 - (absLat * 0.45); // Warm at equator, cooler toward poles
  const baseRain = Math.max(0.5, (10 - (absLat * 0.15)));
  
  let totalVal = 0;
  let maxVal = -Infinity;
  let minVal = Infinity;

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Controlled pseudo-random noise for realistic variance
    const dayFactor = Math.sin((30 - i) * 0.3) * 2.5;
    const noise = (Math.random() - 0.5) * 1.8;
    
    let value, unit, label;
    if (layerCategory === 'Temperature' || layerCategory === 'Imagery') {
      value = parseFloat((baseTemp + dayFactor + noise).toFixed(1));
      unit = '°C';
      label = 'Surface Temp';
    } else if (layerCategory === 'Precipitation') {
      value = parseFloat(Math.max(0, (baseRain + dayFactor * 1.2 + noise * 2)).toFixed(1));
      unit = 'mm/day';
      label = 'Precipitation';
    } else if (layerCategory === 'Vegetation') {
      value = parseFloat(Math.min(0.95, Math.max(0.1, 0.65 + Math.sin(i * 0.1) * 0.12 + noise * 0.05)).toFixed(2));
      unit = 'NDVI';
      label = 'Vegetation Index';
    } else {
      value = parseFloat(Math.max(0.02, 0.28 + dayFactor * 0.05 + noise * 0.04).toFixed(3));
      unit = 'AOD';
      label = 'Aerosol Optical Depth';
    }

    totalVal += value;
    if (value > maxVal) maxVal = value;
    if (value < minVal) minVal = value;

    dataPoints.push({
      date: dateStr,
      value: value,
      unit: unit,
      label: label
    });
  }

  const meanVal = parseFloat((totalVal / 30).toFixed(1));
  const prevPeriodMean = parseFloat((meanVal * (1 + (Math.random() * 0.12 - 0.06))).toFixed(1));
  const changePct = parseFloat((((meanVal - prevPeriodMean) / prevPeriodMean) * 100).toFixed(1));

  // Comparison bar chart data (Current vs Previous 30-day vs 5-Yr Baseline)
  const comparisonData = [
    { period: '5-Yr Baseline', value: parseFloat((meanVal * 0.96).toFixed(1)) },
    { period: 'Previous 30d', value: prevPeriodMean },
    { period: 'Current 30d', value: meanVal }
  ];

  // Plain-language insight text generator
  let insightText = '';
  if (layerCategory === 'Temperature' || layerCategory === 'Imagery') {
    const trend = changePct >= 0 ? `elevated by +${changePct}%` : `decreased by ${Math.abs(changePct)}%`;
    insightText = `Over the past 30 days, mean land surface temperature in this region averaged ${meanVal}°C (peak: ${maxVal}°C). Temperatures were ${trend} compared to the previous period.`;
  } else if (layerCategory === 'Precipitation') {
    insightText = `Cumulative precipitation averaged ${meanVal} mm/day across the 30-day monitoring window. Total moisture flux shows a ${changePct >= 0 ? 'surplus' : 'deficit'} of ${Math.abs(changePct)}% vs prior baseline.`;
  } else if (layerCategory === 'Vegetation') {
    insightText = `Vegetation canopy index (NDVI) averaged ${meanVal}, indicating ${meanVal > 0.5 ? 'healthy vigorous canopy' : 'moderate to sparse vegetation cover'}, with ${changePct >= 0 ? 'positive photosynthetic growth' : 'minor senescence'}.`;
  } else {
    insightText = `Atmospheric aerosol concentration averaged ${meanVal} AOD, representing ${meanVal < 0.3 ? 'clean to moderate air clarity' : 'elevated particulate or dust concentration'} across the bounding perimeter.`;
  }

  return {
    isMockData: true,
    dataSource: 'NASA POWER API (Simulated Fallback Mode)',
    lat: parseFloat(lat.toFixed(4)),
    lon: parseFloat(lon.toFixed(4)),
    category: layerCategory,
    timeSeries: dataPoints,
    comparison: comparisonData,
    stats: [
      {
        label: '30-Day Mean',
        value: `${meanVal} ${dataPoints[0].unit}`,
        change: changePct,
        trend: changePct >= 0 ? 'up' : 'down'
      },
      {
        label: 'Peak Maximum',
        value: `${maxVal} ${dataPoints[0].unit}`,
        change: 0,
        trend: 'neutral'
      },
      {
        label: 'Period Delta',
        value: `${changePct >= 0 ? '+' : ''}${changePct}%`,
        change: changePct,
        trend: changePct >= 0 ? 'up' : 'down'
      },
      {
        label: 'Anomaly Level',
        value: Math.abs(changePct) > 8 ? 'Elevated' : 'Nominal',
        change: 0,
        trend: Math.abs(changePct) > 8 ? 'up' : 'neutral'
      }
    ],
    insight: insightText
  };
}
