/**
 * Centralized API Client for BHRAMANASTHRA FastAPI Backend
 * Connects Member 3 React Frontend to Member 2 FastAPI Backend & Evidence Ledger
 * NASA Space Apps Challenge 2026: Dancing with the SARs
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Standard HTTP Request Wrapper with standardized PRD Error Handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
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
    const networkError = new Error(`Network failure connecting to ${url}: ${err.message}`);
    networkError.code = 'NETWORK_ERROR';
    networkError.suggested_action = 'Ensure FastAPI backend is running on localhost:8000.';
    throw networkError;
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

