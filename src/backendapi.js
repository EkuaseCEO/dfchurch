// src/api/apiFetch.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetchBack = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include', // send cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      throw new Error(data.message || 'Request failed');
    } catch {
      throw new Error(text.includes('<') ? 'Unauthorized or invalid session' : text);
    }
  }

  return res.json();
};
