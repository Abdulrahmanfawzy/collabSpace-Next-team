
import axios from "axios";

let apiToken: string | null = null;

/** Store the backend token so client API calls can authenticate. */
export function setApiToken(token: string | null) {
  apiToken = token;
}

async function resolveToken(): Promise<string | null> {
  if (apiToken) return apiToken;
  if (typeof window === "undefined") return null;

  // Backwards compatibility with any code that still stores the raw token.
  const storedToken = window.localStorage.getItem("token");
  if (storedToken) return storedToken;

  try {
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    apiToken = session?.backendToken ?? null;
    return apiToken;
  } catch {
    return null;
  }
}

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await resolveToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default apiClient;
