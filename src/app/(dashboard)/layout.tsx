
import { redirect } from "next/navigation";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { getAccessToken } from "@/auth";
import { authQueryKeys } from "@/features/auth/constants/auth.query-keys";
import {
  authService,
  AuthApiError,
} from "@/features/auth/services/auth.service";
import NavBar from "@/components/layout/Navbar/Navbar";
import { Toaster } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    redirect("/login");
  }

  const queryClient = new QueryClient();

  try {
    const response = await authService.me(accessToken);

    queryClient.setQueryData(
      authQueryKeys.currentUser,
      response.data
    );
  } catch (error) {
    if (error instanceof AuthApiError && error.status === 401) {
      redirect("/login");
    }

    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="bg-light w-full">
        <NavBar />
        <Toaster position="top-right" richColors />
        <main className="app-container">
          {children}
        </main>
      </div>
    </HydrationBoundary>
  );
}
