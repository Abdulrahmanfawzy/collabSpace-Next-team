import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getBackendToken } from "@/auth";
import { authService } from "@/features/auth/services/auth.service";
import { profileService } from "@/features/profile/services/profile.service";
import { ProfileOverview } from "@/features/profile/components/ProfileOverview";
import ServerDataFetcher from "@/components/common/ServerDataFetcher";

export const metadata: Metadata = {
  title: "Profile Overview",
};

export default async function ProfilePage() {
  const token = await getBackendToken();

  if (!token) {
    redirect("/login");
  }

  const userResponse = await authService.me(token);
  const about = userResponse.data.user.about;

  return (
    <ServerDataFetcher
      fetcherFn={() => profileService.getActivities(token)}
    >
      {(activitiesResponse) => (
        <ProfileOverview
          about={about}
          activities={activitiesResponse.data}
        />
      )}
    </ServerDataFetcher>
  );
}