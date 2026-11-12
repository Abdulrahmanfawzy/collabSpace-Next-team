import { getAccessToken } from "@/auth";
import getProjectReports from "@/api/projectReports.api";
import ReportActivityChart from "@/features/Reports/components/ReportActivityChart";
import ReportRequestForm from "@/features/Reports/components/ReportRequestForm";
import RateCards from "@/features/Reports/components/TaskReports";
import CompletionVsDeadline from "@/features/Reports/components/completionDeadline";
import ProjectsProgress from "@/features/Reports/components/ProjectProgress";

export default async function ReportsPage() {
  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error("No authenticated backend token was found for reports.");

  const response = await getProjectReports(accessToken);
  const { chart, summary } = response.data;

  return (
    <section className="rounded-2xl bg-slate-50 p-4 sm:p-6">
    

      <div >
        <RateCards rates={[
          { id: "total", title: "Total Projects", value: summary.total_projects, suffix: "" },
          { id: "active", title: "Active Projects", value: summary.active_projects, suffix: "" },
          { id: "completion", title: "Average Completion Rate", value: summary.average_completion_rate },
        ]} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <CompletionVsDeadline
          data={chart.data.map((point) => ({ label: point.label, value: point.completed_tasks }))}
          title="Completed Tasks by Month"
        />
        <ProjectsProgress
          projects={["All Projects"]}
          data={chart.data.map((point, x) => ({ x, value: point.projects }))}
          ticks={chart.data.map((point, x) => ({ x, label: point.month }))}
          title="Projects by Month"
          valueLabel="Projects"
        />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-2 mt-5"> 
        <ReportActivityChart
          data={chart.data}
          period={chart.period}
          year={chart.year}
          summary={summary}
        />
        <ReportRequestForm />
      </div>
    </section>
  );
}
