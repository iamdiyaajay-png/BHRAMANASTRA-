/**
 * Centralized API Client for BHRAMANASTHRA FastAPI Backend
 * Connects Member 3 React Frontend to Member 2 FastAPI Backend & Evidence Ledger
 * NASA Space Apps Challenge 2026: Dancing with the SARs
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 
  (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('api_base')) ||
  (import.meta.env.PROD ? 'https://bhramanasthra-backend.onrender.com' : '');

/**
 * Verified Study Areas Catalog (Preserving authentic science & provenance data)
 * Default fallback ensuring all 3 monitored regions render reliably even during cold starts or offline states
 */
export const DEFAULT_STUDY_AREAS = [
  {
    id: 'kerala-floods-2018',
    name: 'Kerala Flood Basin (Periyar River)',
    description: 'Severe inundation event in August 2018 following heavy monsoon rains and dam releases across the Periyar and Chalakudy river basins. Monitored for receding flood behavior.',
    bounding_box: [76.15, 9.90, 76.55, 10.30],
    crs: 'EPSG:4326',
    phenomenon_type: 'flood',
    expected_behavior: 'receding',
    data_tier: 'Tier 1 (Core)',
    data_provenance: 'ILLUSTRATIVE — NOT REAL DATA',
    default_reference_date: '2018-08-08',
    default_comparison_date: '2018-08-16'
  },
  {
    id: 'valencia-inundation-2024',
    name: 'Valencia Coastal Plain (DANA Event)',
    description: 'Flash flooding and surface runoff across the coastal plain of Valencia, Spain in October 2024. Monitored for surface water extent and recession.',
    bounding_box: [-0.55, 39.25, -0.25, 39.55],
    crs: 'EPSG:4326',
    phenomenon_type: 'flood',
    expected_behavior: 'receding',
    data_tier: 'Tier 1 (Core)',
    data_provenance: 'ILLUSTRATIVE — NOT REAL DATA',
    default_reference_date: '2024-10-23',
    default_comparison_date: '2024-10-31'
  },
  {
    id: 'wayanad-landslide-2024',
    name: 'Wayanad Hills Scar (Meppadi Region)',
    description: 'Massive debris flow and landslide scar in the Western Ghats slopes of Wayanad, Kerala in July 2024. Monitored for sustained surface disruption.',
    bounding_box: [76.12, 11.48, 76.32, 11.62],
    crs: 'EPSG:4326',
    phenomenon_type: 'landslide',
    expected_behavior: 'sustained',
    data_tier: 'Tier 2 (Extended)',
    data_provenance: 'ILLUSTRATIVE — NOT REAL DATA',
    default_reference_date: '2024-07-20',
    default_comparison_date: '2024-08-01'
  }
];

/**
 * Standard HTTP Request Wrapper with standardized PRD Error Handling
 * Includes automatic retry for Render free-tier cold starts (502/503/network hiccup)
 */
async function request(endpoint, options = {}, retries = 2) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        // If 502, 503, 504 (typical during Render instance spin-up), retry before throwing
        if ([502, 503, 504].includes(response.status) && attempt < retries) {
          console.warn(`Render backend returning HTTP ${response.status} (likely cold-starting). Retrying in 2s...`);
          await new Promise(r => setTimeout(r, 2000));
          continue;
        }
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            code: 'HTTP_ERROR',
            message: `Request failed with status ${response.status}: ${response.statusText}`,
            suggested_action: 'Check backend server logs and network connectivity.'
          };
        }
        const error = new Error(errorData.message || `HTTP ${response.status}`);
        error.status = response.status;
        error.code = errorData.code;
        error.suggested_action = errorData.suggested_action;
        error.details = errorData;
        throw error;
      }

      // Handle JSON vs Text/Blob responses
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json') || contentType.includes('application/geo+json')) {
        return await response.json();
      }
      return await response.text();
    } catch (err) {
      if (err.status) throw err;
      // If network failure during cold-start or connection establishment, retry if attempts remain
      if (attempt < retries) {
        console.warn(`Attempt ${attempt + 1} connecting to backend failed (${err.message}). Retrying in 2s...`);
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      const isRemote = url.includes('onrender.com') || import.meta.env.PROD;
      const networkError = new Error(`Network failure connecting to ${url}: ${err.message}`);
      networkError.code = 'NETWORK_ERROR';
      networkError.suggested_action = isRemote
        ? 'Backend may be cold-starting (30-50s) or requires CORS origin https://bhramanastra.vercel.app in BHNMISNTRA_CORS_ORIGINS.'
        : 'Ensure FastAPI backend is running on localhost:8000.';
      throw networkError;
    }
  }
}

export const apiClient = {
  /**
   * 1. GET /api/health
   */
  async checkHealth() {
    return request('/api/health');
  },

  /**
   * 2. GET /api/study-areas
   */
  async getStudyAreas() {
    return request('/api/study-areas');
  },

  /**
   * 3. GET /api/study-areas/{id}
   */
  async getStudyArea(id) {
    return request(`/api/study-areas/${encodeURIComponent(id)}`);
  },

  /**
   * 4. GET /api/study-areas/{id}/acquisitions
   */
  async getStudyAreaAcquisitions(id) {
    return request(`/api/study-areas/${encodeURIComponent(id)}/acquisitions`);
  },

  /**
   * 5. POST /api/investigations
   * Protected mutation endpoint. Accepts optional apiKey.
   */
  async createInvestigation({ study_area_id, reference_date, comparison_date }, apiKey = null) {
    const headers = {};
    if (apiKey) {
      headers['X-API-Key'] = apiKey;
    }
    return request('/api/investigations', {
      method: 'POST',
      headers,
      body: {
        study_area_id,
        reference_date,
        comparison_date
      }
    });
  },

  /**
   * 6. GET /api/investigations/{id}
   */
  async getInvestigation(id) {
    return request(`/api/investigations/${encodeURIComponent(id)}`);
  },

  /**
   * 7. GET /api/investigations/{id}/evaluation
   */
  async getInvestigationEvaluation(id) {
    return request(`/api/investigations/${encodeURIComponent(id)}/evaluation`);
  },

  /**
   * 8. GET /api/investigations/{id}/ledger
   */
  async getInvestigationLedger(id) {
    return request(`/api/investigations/${encodeURIComponent(id)}/ledger`);
  },

  /**
   * 9. GET /api/investigations/{id}/layers/change-mask
   */
  async getInvestigationChangeMask(id) {
    return request(`/api/investigations/${encodeURIComponent(id)}/layers/change-mask`);
  },

  /**
   * 10. Report & Download Links
   */
  getInvestigationReportUrl(id) {
    return `${API_BASE}/api/investigations/${encodeURIComponent(id)}/report`;
  },

  getInvestigationLedgerDownloadUrl(id) {
    return `${API_BASE}/api/investigations/${encodeURIComponent(id)}/ledger/download`;
  }
};

/**
 * Checks whether a given geographic coordinate or bounds falls within
 * any of the monitored SAR study areas.
 * 
 * @param {Object} center - { lat, lon }
 * @param {Array} studyAreas - List of StudyArea objects
 * @returns {Object|null} Matching StudyArea or null
 */
export function findMatchingStudyArea(center, studyAreas = []) {
  if (!center || !center.lat || !center.lon || !Array.isArray(studyAreas)) {
    return null;
  }

  const { lat, lon } = center;

  for (const area of studyAreas) {
    const bbox = area.bounding_box; // [min_lon, min_lat, max_lon, max_lat]
    if (Array.isArray(bbox) && bbox.length === 4) {
      const [minLon, minLat, maxLon, maxLat] = bbox;
      // Allow a small geographic buffer around the bounding box (0.25 degrees ~ 27 km)
      const buffer = 0.25;
      if (
        lon >= minLon - buffer &&
        lon <= maxLon + buffer &&
        lat >= minLat - buffer &&
        lat <= maxLat + buffer
      ) {
        return area;
      }
    }
  }

  return null;
}

