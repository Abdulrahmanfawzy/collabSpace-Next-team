import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import MainNav from "@/components/layout/Navbar/components/MainNav";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { authService } from "@/features/auth/services/auth.service";
import { auth } from "@/auth";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const token = session?.backendToken;

  if (!token) {
    redirect("/login");
  }

  const response = await authService.me(token);
  const { user, stats } = response.data;

  return (
    <main className="min-h-screen bg-light px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <MainNav roles={session?.user?.roles ?? []} />

        <ProfileHeader user={user} stats={stats} />

        {children}
      </div>
    </main>
  );
}
