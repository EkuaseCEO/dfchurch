const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const originalFetch = window.fetch;

window.fetch = async (input, options = {}) => {
  let url = input;

  // Prepend base URL if input starts with /api or does not already start with full URL
  if (typeof input === "string" && !input.startsWith('http')) {
    url = `${API_BASE_URL}${input}`;
  }

  const res = await originalFetch(url, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API request failed: ${res.status} ${text}`);
  }

  return res.json(); // parsed JSON
};
