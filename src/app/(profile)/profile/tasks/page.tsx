import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getBackendToken } from "@/auth";
import ServerDataFetcher from "@/components/common/ServerDataFetcher";
import ProfileTasks from "@/features/profile/components/ProfileTasks";
import {
  ProfileApiError,
  profileService,
} from "@/features/profile/services/profile.service";

export const metadata: Metadata = {
  title: "Profile Tasks",
};

export default async function ProfileTasksPage() {
  const token = await getBackendToken();

  if (!token) {
    redirect("/login");
  }

  return (
    <ServerDataFetcher
      fetcherFn={() => profileService.getTasks(token)}
      errorFallback={(error) => {
        if (error instanceof ProfileApiError && error.status === 401) {
          redirect("/login");
        }

        return (
          <section className="rounded-xl border border-border bg-white p-6">
            <p role="alert" className="text-sm text-destructive">
              {error instanceof Error
                ? error.message
                : "Unable to retrieve your tasks."}
            </p>
          </section>
        );
      }}
    >
      {(response) => <ProfileTasks tasks={response.data} />}
    </ServerDataFetcher>
  );
}