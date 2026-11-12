import "server-only";
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
interface DashboardOptions {
  accessToken: string;
}

const getDashboard = async ({ accessToken }: DashboardOptions): Promise<DashboardData> => {
  if (!accessToken) {
    throw new Error("Cannot fetch dashboard without an authenticated access token.");
  }
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/dashboard`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
      cache: "no-store",
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${JSON.stringify(payload)}`);
    }

  
    const dashboard = payload?.data ?? payload;
    if (!dashboard?.overview?.tasks) {
      throw new Error(
        `Invalid dashboard response from ${response.url}: expected data.overview.tasks.`,
      );
    }

    if (process.env.NODE_ENV !== "production") {
      console.info("Dashboard API response summary", {
        status: response.status,
        projectsTotal: dashboard.overview.projects?.total ?? null,
        tasksTotal: dashboard.overview.tasks.total ?? null,
        activeProjects: dashboard.active_projects?.items?.length ?? null,
        tasks: dashboard.tasks?.items?.length ?? null,
        teams: dashboard.teams?.items?.length ?? null,
        meetings: dashboard.upcoming_meetings?.items?.length ?? null,
        recentFiles: dashboard.recent_files?.items?.length ?? null,
      });
    }

    return dashboard as DashboardData;
  } catch (error) {
    console.error("Dashboard Error:", error);
    throw error;
  }
};

export default getDashboard;
