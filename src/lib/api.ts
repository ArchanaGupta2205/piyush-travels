const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "/api";
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/api`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }
  return `http://127.0.0.1:${process.env.PORT || 3000}/api`;
};

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

  const baseUrl = getBaseUrl();
  const formattedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(`${baseUrl}${formattedEndpoint}`, config);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
