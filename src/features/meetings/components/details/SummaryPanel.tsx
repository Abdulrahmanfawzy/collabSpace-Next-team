interface SummaryPanelProps {
  keyPoints: string[];
  /** The design reads "AI Generate Summary"; "Generated" is the grammatical form. */
  title?: string;
}

export default function SummaryPanel({
  keyPoints,
  title = "AI Generated Summary",
}: SummaryPanelProps) {
  return (
    <section className="min-h-64 rounded-2xl bg-muted/50 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>

      <h3 className="mt-4 text-lg font-medium">Key Points</h3>

      <ul className="mt-3 space-y-3 text-sm">
        {keyPoints.map((point) => (
          <li key={point} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
