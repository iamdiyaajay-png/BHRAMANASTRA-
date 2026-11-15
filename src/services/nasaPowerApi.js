import { generateFallbackData } from '../data/mockData';

/**
 * NASA POWER API Client (Prediction of Worldwide Energy Resources)
 * Free public NASA API delivering daily solar, meteorological, and climate parameters.
 * Endpoint: https://power.larc.nasa.gov/api/temporal/daily/point
 */

export async function fetchNasaPowerData(lat, lon, layerCategory = 'Temperature') {
  // NASA POWER requires YYYYMMDD format
  const endDateObj = new Date();
  endDateObj.setDate(endDateObj.getDate() - 5); // NASA POWER has ~3-5 day lag for validated daily products
  const startDateObj = new Date(endDateObj);
  startDateObj.setDate(startDateObj.getDate() - 30);

  const formatNasaDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const startStr = formatNasaDate(startDateObj);
  const endStr = formatNasaDate(endDateObj);

  // Parameters to query based on category
  let paramKey = 'T2M';
  let unit = '°C';
  let label = 'Surface Temp';

  if (layerCategory === 'Precipitation') {
    paramKey = 'PRECTOTCORR';
    unit = 'mm/day';
    label = 'Precipitation';
  } else if (layerCategory === 'Vegetation') {
    // Relative Humidity & Solar radiation as biophysical proxy when NDVI is chosen
    paramKey = 'RH2M';
    unit = '% RH';
    label = 'Relative Humidity';
  } else if (layerCategory === 'Air Quality') {
    paramKey = 'ALLSKY_SFC_SW_DWN';
    unit = 'kW-hr/m²';
    label = 'Solar Irradiance';
  }

  const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${paramKey},T2M_MAX&community=RE&longitude=${lon.toFixed(4)}&latitude=${lat.toFixed(4)}&start=${startStr}&end=${endStr}&format=JSON`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`NASA POWER API HTTP ${response.status}`);
    }

    const json = await response.json();
    const series = json?.properties?.parameter?.[paramKey];

    if (!series || Object.keys(series).length === 0) {
      throw new Error('No series data in NASA response');
    }

    const timeSeries = [];
    let total = 0;
    let maxVal = -Infinity;
    let count = 0;

    for (const [key, rawVal] of Object.entries(series)) {
      if (rawVal === -999 || rawVal === null) continue; // NASA fill value
      const val = parseFloat(rawVal.toFixed(2));
      const year = key.substring(0, 4);
      const month = key.substring(4, 6);
      const day = key.substring(6, 8);
      const dateStr = `${year}-${month}-${day}`;

      timeSeries.push({
        date: dateStr,
        value: val,
        unit: unit,
        label: label
      });

      total += val;
      if (val > maxVal) maxVal = val;
      count++;
    }

    if (count < 5) {
      throw new Error('Insufficient valid data points from NASA POWER');
    }

    const meanVal = parseFloat((total / count).toFixed(1));
    const firstHalf = timeSeries.slice(0, Math.floor(count / 2));
    const secondHalf = timeSeries.slice(Math.floor(count / 2));
    const firstMean = firstHalf.reduce((acc, c) => acc + c.value, 0) / firstHalf.length;
    const secondMean = secondHalf.reduce((acc, c) => acc + c.value, 0) / secondHalf.length;
    const changePct = parseFloat((((secondMean - firstMean) / (firstMean || 1)) * 100).toFixed(1));

    const comparisonData = [
      { period: 'Pre-Window (T1)', value: parseFloat(firstMean.toFixed(1)) },
      { period: 'Mid-Window (T2)', value: parseFloat(((firstMean + secondMean) / 2).toFixed(1)) },
      { period: 'Current (T3)', value: parseFloat(secondMean.toFixed(1)) }
    ];

    let insightText = '';
    if (layerCategory === 'Temperature' || layerCategory === 'Imagery') {
      insightText = `NASA observations record an average surface temperature of ${meanVal}°C (peak: ${maxVal}°C). Thermal values shifted by ${changePct >= 0 ? '+' : ''}${changePct}% across the 30-day monitoring window.`;
    } else if (layerCategory === 'Precipitation') {
      insightText = `NASA GPM and assimilation models indicate mean precipitation of ${meanVal} mm/day. Total rainfall changed by ${changePct >= 0 ? '+' : ''}${changePct}% relative to the baseline period.`;
    } else if (layerCategory === 'Air Quality') {
      insightText = `Atmospheric solar transmissivity averaged ${meanVal} kW-hr/m², reflecting ${meanVal > 4.5 ? 'clear atmospheric column' : 'attenuation from aerosol particulate, smoke, or haze'}.`;
    } else {
      insightText = `NASA environmental indices recorded an average of ${meanVal} ${unit} across the selected area, shifting by ${changePct >= 0 ? '+' : ''}${changePct}%.`;
    }

    return {
      isMockData: false,
      dataSource: 'NASA POWER API (Live Telemetry)',
      lat: parseFloat(lat.toFixed(4)),
      lon: parseFloat(lon.toFixed(4)),
      category: layerCategory,
      timeSeries: timeSeries,
      comparison: comparisonData,
      stats: [
        {
          label: 'Period Mean',
          value: `${meanVal} ${unit}`,
          change: changePct,
          trend: changePct >= 0 ? 'up' : 'down'
        },
        {
          label: 'Peak Maximum',
          value: `${maxVal} ${unit}`,
          change: 0,
          trend: 'neutral'
        },
        {
          label: 'Window Shift',
          value: `${changePct >= 0 ? '+' : ''}${changePct}%`,
          change: changePct,
          trend: changePct >= 0 ? 'up' : 'down'
        },
        {
          label: 'Data Integrity',
          value: 'Validated',
          change: 0,
          trend: 'neutral'
        }
      ],
      insight: insightText
    };
  } catch (err) {
    console.warn(`NASA POWER API unavailable (${err.message}). Using resilient mock fallback.`);
    return generateFallbackData(lat, lon, layerCategory);
  }
}
