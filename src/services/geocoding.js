/**
 * Worldwide Geocoding Service using OpenStreetMap Nominatim
 * Allows instant search and camera jumps to any global location.
 */

export async function searchLocation(query) {
  if (!query || query.trim().length < 2) return [];

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Geocoding HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.map(item => ({
      name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      boundingbox: item.boundingbox.map(b => parseFloat(b))
    }));
  } catch (error) {
    console.warn('Geocoding service unavailable or rate-limited:', error);
    return [];
  }
}
