
import type { MeetingSummary } from "@/features/meetings/types/meeting.types";

interface SummaryPanelProps {
  summary: MeetingSummary | null;
  title?: string;
}

export default function SummaryPanel({
  summary,
  title = "AI Generated Summary",
}: SummaryPanelProps) {
  if (!summary) {
    return (
      <section className="min-h-64 rounded-2xl bg-muted/50 p-5 sm:p-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          No meeting summary available yet.
        </p>
      </section>
    );
  }

  const sections = [
    {
      title: "Decisions Made",
      items: summary.decisions_made,
    },
    {
      title: "Action Items",
      items: summary.action_items,
    },
    {
      title: "Assigned Tasks",
      items: summary.assigned_tasks,
    },
    {
      title: "Risks",
      items: summary.risks,
    },
    {
      title: "Next Steps",
      items: summary.next_steps,
    },
  ];

  return (
    <section className="min-h-64 rounded-2xl bg-muted/50 p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">{title}</h2>

        {summary.generated_by_ai && (
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            AI Generated
          </span>
        )}
      </div>

      {/* Summary */}
      <div className="mt-5">
        <h3 className="text-lg font-medium">Overview</h3>

        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {summary.summary}
        </p>
      </div>

      {/* Summary Sections */}
      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-medium">
              {section.title}
            </h3>

            {section.items.length > 0 ? (
              <ul className="mt-3 space-y-3 text-sm">
                {section.items.map((item, index) => (
                  <li
                    key={`${section.title}-${index}`}
                    className="flex gap-2"
                  >
                    <span
                      aria-hidden="true"
                      className="text-primary"
                    >
                      •
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No {section.title.toLowerCase()} available.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
