const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // If backend accidentally returns HTML
  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON but got:", text);
    throw new Error("API did not return JSON");
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};


// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const apiFetch = async (endpoint, options = {}) => {
//   const url = `${API_BASE_URL}${endpoint}`;

//   const res = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     ...options,
//   });

//   // Helpful debug if backend returns HTML instead of JSON
//   const contentType = res.headers.get("content-type");
//   if (!contentType || !contentType.includes("application/json")) {
//     const text = await res.text();
//     console.error("Expected JSON but got:", text);
//     throw new Error("API did not return JSON");
//   }

//   if (!res.ok) {
//     throw new Error(`API request failed with status ${res.status}`);
//   }

//   return res; // ✅ return raw Response
// };





