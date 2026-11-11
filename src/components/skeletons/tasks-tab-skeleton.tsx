import { Skeleton } from "@/components/ui/skeleton"

const TaskCardSkeleton = () => (
  <div className="flex flex-col gap-3 rounded-xl border border-bg-label bg-bg-light p-4">
    <div className="flex items-start justify-between gap-2">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-4 w-12 rounded-full" />
    </div>
    <div className="space-y-1.5">
      <Skeleton className="h-2.5 w-full" />
      <Skeleton className="h-2.5 w-3/4" />
    </div>
    <div className="mt-1 space-y-1.5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-2.5 w-12" />
        <Skeleton className="h-2.5 w-7" />
      </div>
      <Skeleton className="h-1 w-full rounded-full" />
    </div>
    <div className="flex items-center justify-between">
      <div className="flex -space-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="size-6 rounded-full border-2 border-white"
          />
        ))}
      </div>
      <Skeleton className="h-3 w-20" />
    </div>
  </div>
)

const TasksTabSkeleton = () => (
  <section
    aria-label="Loading tasks"
    aria-busy="true"
    className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
  >
    {Array.from({ length: 4 }).map((_, columnIndex) => (
      <div
        key={columnIndex}
        className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white"
      >
        <div className="flex items-center justify-between bg-gray-50 p-3">
          <div className="flex items-center gap-2">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="size-4" />
        </div>
        <div className="flex flex-col gap-3 p-3">
          <Skeleton className="h-9 w-full rounded-lg" />
          {Array.from({ length: columnIndex === 0 ? 3 : 2 }).map(
            (_, cardIndex) => (
              <TaskCardSkeleton key={cardIndex} />
            )
          )}
        </div>
      </div>
    ))}
  </section>
)

export default TasksTabSkeleton
