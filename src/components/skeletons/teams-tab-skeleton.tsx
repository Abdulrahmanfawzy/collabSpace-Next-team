import { Skeleton } from "@/components/ui/skeleton"

const TeamMemberSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="size-10 shrink-0 rounded-full" />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-2.5 w-16" />
      </div>
      <Skeleton className="h-1 w-full rounded-full" />
    </div>
  </div>
)

const TeamCardSkeleton = () => (
  <div className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm">
    <div className="flex items-center justify-between gap-2 bg-gray-100 p-5">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-24" />
    </div>
    <div className="p-3">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-3 w-10" />
      </div>
      <div className="flex flex-col gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <TeamMemberSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
)

const TeamsTabSkeleton = () => (
  <section
    aria-label="Loading teams"
    aria-busy="true"
    className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
  >
    {Array.from({ length: 4 }).map((_, index) => (
      <TeamCardSkeleton key={index} />
    ))}
  </section>
)

export default TeamsTabSkeleton
