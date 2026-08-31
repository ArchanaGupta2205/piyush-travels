const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add auth token if exists (e.g. from localStorage in client components)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
