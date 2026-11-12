import "server-only";

export type ProjectReportPoint = {
  label: string;
  month: string;
  month_number: number;
  year: number;
  is_future: boolean;
  projects: number;
  completed_tasks: number;
};

export type ProjectReportsResponse = {
  success: boolean;
  message: string;
  data: {
    summary: {
      total_projects: number;
      active_projects: number;
      delayed_projects: number;
      completed_projects: number;
      on_hold_projects: number;
      average_completion_rate: number;
    };
    projects: unknown[];
    chart: {
      period: string;
      year: number;
      from: string;
      to: string;
      group_by: string;
      data: ProjectReportPoint[];
    };
  };
};

export default async function getProjectReports(
  accessToken: string,
): Promise<ProjectReportsResponse> {
  const baseUrl = process.env.API?.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");
  if (!baseUrl) throw new Error("Reports API is not configured. Set the API environment variable.");

  const response = await fetch(`${baseUrl}/api/v1/reports/projects`, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to fetch project reports (${response.status}): ${JSON.stringify(payload)}`);
  }
  if (!payload?.data?.summary || !Array.isArray(payload?.data?.chart?.data)) {
    throw new Error("Invalid project reports response: expected data.summary and data.chart.data.");
  }
  return payload as ProjectReportsResponse;
}
