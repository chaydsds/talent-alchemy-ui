export const API_CONFIG = {
  BASE_URL: 'http://35.154.29.115:8000/api',
  VERSION: 'v1',
  ENDPOINTS: {
    RESUMES: 'search/all/',
    UPLOAD_RESUME: 'resume/upload/',
    SEARCH: 'search/search/',
  },
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}/${endpoint}`;
};