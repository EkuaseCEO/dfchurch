const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
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
//   const res = await fetch(`${API_BASE_URL}${endpoint}`, {
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     ...options,
//   });

//   if (!res.ok) {
//     throw new Error("API request failed");
//   }

//   return res.json();
// };
