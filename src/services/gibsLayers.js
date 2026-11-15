/**
 * NASA GIBS (Global Imagery Browse Services) WMTS Configuration
 * Free, public imagery tile services provided by NASA EOSDIS.
 * No API key required.
 * Format: https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{layer}/default/{date}/{tileMatrixSet}/{z}/{y}/{x}.{ext}
 */

export const GIBS_LAYERS = [
  {
    id: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    name: 'Satellite True Color',
    category: 'Imagery',
    icon: '🛰️',
    description: 'Natural optical true-color satellite imagery from MODIS Terra as seen from orbit.',
    format: 'jpg',
    tileMatrixSet: 'GoogleMapsCompatible_Level9',
    maxZoom: 9,
    unit: 'Natural Optical',
    gradient: 'linear-gradient(90deg, #1d402b, #8b7355, #3b608b, #f0f0f0)',
    legendMin: 'Land & Ocean',
    legendMax: 'Clouds & Ice'
  },
  {
    id: 'MODIS_Terra_Land_Surface_Temp_Day',
    name: 'Land Surface Temperature',
    category: 'Temperature',
    icon: '🌡️',
    description: 'Daytime surface thermal observations from MODIS Terra showing global heat distribution.',
    format: 'png',
    tileMatrixSet: 'GoogleMapsCompatible_Level7',
    maxZoom: 7,
    unit: 'Kelvin / °C',
    gradient: 'linear-gradient(90deg, #313695, #4575b4, #74add1, #abd9e9, #ffffbf, #fdae61, #f46d43, #d73027, #a50026)',
    legendMin: '-20°C (Cold)',
    legendMax: '50°C+ (Extreme Heat)'
  },
  {
    id: 'IMERG_Precipitation_Rate',
    name: 'Precipitation / Rain Rate',
    category: 'Precipitation',
    icon: '🌧️',
    description: 'Global rainfall and snowfall precipitation rates from GPM IMERG microwave radar.',
    format: 'png',
    tileMatrixSet: 'GoogleMapsCompatible_Level6',
    maxZoom: 6,
    unit: 'mm/hr',
    gradient: 'linear-gradient(90deg, rgba(68,1,84,0.3), #3b528b, #21918c, #5ec962, #fde725)',
    legendMin: '0.1 mm/hr (Light)',
    legendMax: '25+ mm/hr (Heavy Storms)'
  },
  {
    id: 'MODIS_Terra_Aerosol',
    name: 'Air Quality (Aerosol Optical Depth)',
    category: 'Air Quality',
    icon: '💨',
    description: 'Aerosol Optical Depth (AOD) tracking dust storms, wildfire smoke plumes, and smog.',
    format: 'png',
    tileMatrixSet: 'GoogleMapsCompatible_Level6',
    maxZoom: 6,
    unit: 'AOD',
    gradient: 'linear-gradient(90deg, #2b83ba, #abdda4, #ffffbf, #fdae61, #d7191c)',
    legendMin: '0.05 AOD (Clean Air)',
    legendMax: '1.0+ AOD (Dense Smoke/Smog)'
  },
  {
    id: 'MODIS_Terra_NDVI_16Day',
    name: 'Vegetation Index (NDVI)',
    category: 'Vegetation',
    icon: '🌿',
    description: 'Normalized Difference Vegetation Index showing global plant growth & forest canopy.',
    format: 'png',
    tileMatrixSet: 'GoogleMapsCompatible_Level8',
    maxZoom: 8,
    unit: 'NDVI (-1 to 1)',
    gradient: 'linear-gradient(90deg, #d73027, #fee08b, #d9ef8b, #66bd63, #1a9850, #006837)',
    legendMin: '0.0 (Barren/Water)',
    legendMax: '0.9 (Dense Forest)'
  }
];

/**
 * Returns a valid recent date in YYYY-MM-DD format (2 days ago for reliable complete global coverage)
 */
export function getDefaultGibsDate() {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return d.toISOString().split('T')[0];
}

/**
 * Constructs a NASA GIBS WMTS tile URL template for Leaflet
 */
export function getGibsTileUrl(layerId, date) {
  const layer = GIBS_LAYERS.find(l => l.id === layerId) || GIBS_LAYERS[0];
  const formattedDate = date || getDefaultGibsDate();
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer.id}/default/${formattedDate}/${layer.tileMatrixSet}/{z}/{y}/{x}.${layer.format}`;
}
