import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TABLE_HEADERS = [
  "Project Name",
  "Start Date",
  "Deadline",
  "Status",
  "Files",
  "Teams",
  "Priority",
] as const;

const ROWS = Array.from({ length: 7 }, (_, index) => index);

export function ProjectsPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading projects">
      <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-2">
        <Skeleton className="h-10 w-full max-w-80 rounded-full sm:w-75" />
        <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
          <Skeleton className="h-10 w-45 rounded-2xl" />
          <Skeleton className="h-10 w-45 rounded-2xl" />
        </div>
      </div>

      <div className="settings-sidebar-scrollbar mt-6 w-full overflow-x-auto">
        <Table className="min-w-225">
          <TableHeader>
            <TableRow className="border-b border-secondary-100 hover:bg-transparent">
              {TABLE_HEADERS.map((header) => (
                <TableHead
                  key={header}
                  className="text-lg font-medium text-text-primary"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {ROWS.map((row) => (
              <TableRow
                key={row}
                className="h-15 bg-white py-1 hover:bg-secondary-50"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 shrink-0 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-4 rounded-sm" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    <Skeleton className="size-7 rounded-full border-2 border-white" />
                    <Skeleton className="size-7 rounded-full border-2 border-white" />
                    <Skeleton className="size-7 rounded-full border-2 border-white" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
      </div>
    </div>
  );
}
