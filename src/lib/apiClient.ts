const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiClient(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  // Try to parse JSON
  const contentType = response.headers.get("content-type");
  return contentType?.includes("application/json") ? response.json() : response;
}
