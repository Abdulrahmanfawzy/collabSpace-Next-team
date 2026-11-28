import { Skeleton } from "@/components/ui/skeleton";

const ROWS = Array.from({ length: 5 }, (_, index) => index);

export function ProjectChatsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading project chats"
      className="flex flex-col"
    >
      {ROWS.map((row) => (
        <div
          key={row}
          className="flex items-center gap-3 px-4 py-3"
        >
          <Skeleton className="size-5 shrink-0 rounded" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
