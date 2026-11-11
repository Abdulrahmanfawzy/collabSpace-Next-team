import type { DashboardData } from "../features/Dashboard/types/typesDashboard";

const getApiBaseUrl = () => {
  const rawAPI = process.env.API;
  const baseUrl = rawAPI
    ?.trim()
    .replace(/^['"]|['"]$/g, "")
    .trim()
    .replace(/\/+$/, "");
  if (!baseUrl) {
    throw new Error("Dashboard API is not configured. Set the API environment variable.");
  }
  return baseUrl;
};
const getDashboard = async (): Promise<DashboardData> => {
  const token = process.env.token;
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/dashboard`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${JSON.stringify(payload)}`);
    }

  
    const dashboard = payload?.data ?? payload;
    if (!dashboard?.overview?.tasks) {
      throw new Error("Invalid dashboard response: expected data.overview.tasks.");
    }

    return dashboard as DashboardData;
  } catch (error) {
    console.error("Dashboard Error:", error);
    throw error;
  }
};

export default getDashboard;
