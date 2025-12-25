const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Save original fetch
const originalFetch = window.fetch;

window.fetch = async (input, options = {}) => {
  let url = input;

  // Prepend base URL if the input starts with /api
  if (typeof input === "string") {
    url = `${API_BASE_URL}${input}`;
  }

  const res = await originalFetch(url, options);

  return res; // leave .json() for your existing code
};
