import type { Metadata } from "next";

import { ProfileEditForm } from "@/features/profile/components/ProfileEditForm";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default function EditProfilePage() {
  return (
    <div className="p-10 bg-bg-light">
      <ProfileEditForm />
    </div>
  );
}
