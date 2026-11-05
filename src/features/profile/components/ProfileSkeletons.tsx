import { Skeleton } from "@/components/ui/skeleton";

function ProfileHeaderSkeleton() {
  return (
    <section className="rounded-xl border border-border bg-white p-6">
      <div className="flex items-center gap-5">
        <Skeleton className="size-20 rounded-full" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>

      <Skeleton className="mt-7 h-10 w-full" />
    </section>
  );
}

export function ProfileOverviewSkeleton() {
  return (
    <div className="space-y-6">
      <ProfileHeaderSkeleton />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-32 rounded-xl" />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </div>
  );
}

export function ProfileEditSkeleton() {
  return (
    <div className="space-y-6">
      <ProfileHeaderSkeleton />

      {[1, 2].map((section) => (
        <section
          key={section}
          className="rounded-xl border border-border bg-white p-6"
        >
          <Skeleton className="mb-8 h-5 w-48" />

          <div className="grid gap-7 sm:grid-cols-2">
            {Array.from({ length: section === 1 ? 6 : 1 }).map((_, index) => (
              <Skeleton key={index} className="h-11 rounded-lg" />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ProfileFilesSkeleton() {
  return (
    <div className="space-y-6">
      <ProfileHeaderSkeleton />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-border bg-white"
          >
            <Skeleton className="h-48 rounded-none" />

            <div className="space-y-3 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileTasksSkeleton() {
  return (
    <div className="space-y-6">
      <ProfileHeaderSkeleton />

      <div className="grid gap-6 xl:grid-cols-2">
        {[1, 2].map((section) => (
          <section
            key={section}
            className="rounded-xl border border-border bg-white p-6"
          >
            <Skeleton className="mb-6 h-5 w-24" />

            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-28 rounded-lg" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
