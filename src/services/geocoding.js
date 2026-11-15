/**
 * Worldwide Geocoding Service for BHRAMANASTHRA
 * Resolves continents, countries, administrative states, and cities worldwide
 * using CORS-compliant open geocoding providers (Open-Meteo & Photon).
 * Zero API keys required; fully CORS-enabled.
 */

// Approximate geographic bounding boxes for global continents
const CONTINENT_BOUNDS = {
  africa: [[-35.0, -18.0], [37.5, 51.5]],
  asia: [[-11.0, 26.0], [77.0, 170.0]],
  europe: [[36.0, -10.0], [71.0, 40.0]],
  'north america': [[15.0, -168.0], [72.0, -52.0]],
  'south america': [[-56.0, -82.0], [13.0, -34.0]],
  australia: [[-44.0, 112.0], [-10.0, 154.0]],
  oceania: [[-47.0, 110.0], [0.0, 180.0]],
  antarctica: [[-90.0, -180.0], [-60.0, 180.0]]
};

export async function searchLocation(query) {
  if (!query || query.trim().length < 2) return [];

  const q = query.trim();
  const qLower = q.toLowerCase();
  const encoded = encodeURIComponent(q);

  const results = [];

  // 1. Query Open-Meteo Geocoding API (Fast, handles continents & major administrative divisions)
  const openMeteoPromise = fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encoded}&count=8&language=en&format=json`
  )
    .then(res => (res.ok ? res.json() : null))
    .then(data => {
      if (!data || !Array.isArray(data.results)) return;
      for (const item of data.results) {
        const nameParts = [item.name];
        if (item.admin1 && item.admin1 !== item.name) nameParts.push(item.admin1);
        if (item.country && item.country !== item.name) nameParts.push(item.country);
        const displayName = nameParts.join(', ');

        const fcode = item.feature_code || '';
        let zoom = 11;
        let bounds = null;

        if (fcode === 'CONT') {
          zoom = 3;
          for (const [cName, cBounds] of Object.entries(CONTINENT_BOUNDS)) {
            if (qLower.includes(cName) || item.name.toLowerCase().includes(cName)) {
              bounds = cBounds;
              break;
            }
          }
        } else if (['PCLI', 'PCL', 'PCLD', 'PCLF', 'PCLS'].includes(fcode)) {
          zoom = 5;
        } else if (['ADM1', 'RGN'].includes(fcode)) {
          zoom = 7;
        } else if (['PPLA', 'PPLC', 'PPL'].includes(fcode)) {
          zoom = 11;
        }

        results.push({
          name: displayName,
          lat: parseFloat(item.latitude),
          lon: parseFloat(item.longitude),
          zoom,
          bounds,
          type: fcode || 'place',
          source: 'open-meteo'
        });
      }
    })
    .catch(err => console.warn('Open-Meteo geocoding warning:', err.message));

  // 2. Query Photon Geocoding API (OSM-based, high-accuracy regional boundaries & extents)
  const photonPromise = fetch(
    `https://photon.komoot.io/api/?q=${encoded}&limit=8`
  )
    .then(res => (res.ok ? res.json() : null))
    .then(data => {
      if (!data || !Array.isArray(data.features)) return;
      for (const feat of data.features) {
        const p = feat.properties || {};
        const coords = feat.geometry?.coordinates || [];
        if (coords.length < 2) continue;

        const lon = parseFloat(coords[0]);
        const lat = parseFloat(coords[1]);

        const nameParts = [p.name];
        if (p.state && p.state !== p.name) nameParts.push(p.state);
        if (p.country && p.country !== p.name) nameParts.push(p.country);
        const displayName = nameParts.filter(Boolean).join(', ');

        const osmVal = p.osm_value || p.type || '';
        let bounds = null;
        if (Array.isArray(p.extent) && p.extent.length === 4) {
          // Leaflet bounds format: [[south, west], [north, east]]
          bounds = [
            [parseFloat(p.extent[3]), parseFloat(p.extent[0])],
            [parseFloat(p.extent[1]), parseFloat(p.extent[2])]
          ];
        }

        let zoom = 11;
        if (osmVal === 'continent') {
          zoom = 3;
          for (const [cName, cBounds] of Object.entries(CONTINENT_BOUNDS)) {
            if (qLower.includes(cName) || (p.name && p.name.toLowerCase().includes(cName))) {
              bounds = cBounds;
              break;
            }
          }
        } else if (osmVal === 'country') {
          zoom = 5;
        } else if (['state', 'province', 'region', 'county'].includes(osmVal)) {
          zoom = 8;
        } else if (['city', 'town'].includes(osmVal)) {
          zoom = 11;
        }

        results.push({
          name: displayName,
          lat,
          lon,
          zoom,
          bounds,
          type: osmVal || 'place',
          source: 'photon'
        });
      }
    })
    .catch(err => console.warn('Photon geocoding warning:', err.message));

  // Await both providers with timeout protection
  await Promise.allSettled([openMeteoPromise, photonPromise]);

  if (results.length === 0) return [];

  // Relevance scoring to bring exact and prominent matches to top
  const scoreResult = (item) => {
    const nameLower = item.name.toLowerCase();
    let score = 10;

    if (nameLower.startsWith(qLower)) {
      score += 100;
    } else if (nameLower.includes(qLower)) {
      score += 50;
    }

    // Boost continents, countries, and states for broad geographic searches
    if (['CONT', 'continent'].includes(item.type)) {
      score += 45;
    } else if (['PCLI', 'country'].includes(item.type)) {
      score += 35;
    } else if (['ADM1', 'state'].includes(item.type)) {
      score += 25;
    }

    // Prefer results with defined bounding boxes for regional/national extent
    if (item.bounds) {
      score += 10;
    }

    return score;
  };

  results.sort((a, b) => scoreResult(b) - scoreResult(a));

  // Deduplicate by spatial proximity (~0.1 degrees)
  const deduped = [];
  const seenCoords = new Set();

  for (const item of results) {
    const key = `${item.lat.toFixed(1)},${item.lon.toFixed(1)}`;
    if (!seenCoords.has(key)) {
      seenCoords.add(key);
      deduped.push(item);
    }
  }

  return deduped.slice(0, 5);
}
