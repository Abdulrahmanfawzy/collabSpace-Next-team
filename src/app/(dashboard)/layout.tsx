import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NavBar from "@/components/layout/Navbar/Navbar";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import {
  AUTH_TOKEN_COOKIE,
} from "@/features/auth/constants/auth.constants";

import {
  authQueryKeys,
} from "@/features/auth/constants/auth.query-keys";

import {
  authService,
  AuthApiError,
} from "@/features/auth/services/auth.service";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    AUTH_TOKEN_COOKIE,
  )?.value;

  if (!token) {
    redirect("/login");
  }

  const queryClient = new QueryClient();

  try {
    const response = await authService.me(token);

    queryClient.setQueryData(
      authQueryKeys.currentUser,
      response.data,
    );
  } catch (error) {
    if (
      error instanceof AuthApiError &&
      error.status === 401
    ) {
      cookieStore.delete(AUTH_TOKEN_COOKIE);

      redirect("/login");
    }

    throw error;
  }

  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <div className="bg-light w-full">
        <main className="app-container">
          <NavBar />
          {children}
        </main>
      </div>
    </HydrationBoundary>
  );
}