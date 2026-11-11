import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getBackendToken } from "@/auth";
import { authService, AuthApiError } from "@/features/auth/services/auth.service";
import { ProfileEditForm } from "@/features/profile/components/ProfileEditForm";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default async function EditProfilePage() {
  const token = await getBackendToken();

  if (!token) {
    redirect("/login");
  }

  try {
    const response = await authService.me(token);
    const currentProject = response.data.projects[0]?.name ?? "";

    return (
      <div className="p-10 bg-bg-light">
        <ProfileEditForm user={response.data.user} currentProject={currentProject} />
      </div>
    );
  } catch (error) {
    if (error instanceof AuthApiError && error.status === 401) {
      redirect("/login");
    }

    throw error;
  }
}
