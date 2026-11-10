
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import "@/app/globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar/Navbar";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "collabSpace",
    template: "%s | CollabSpace",
  },
  description: "collabSpace is a platform for project management.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <SessionProvider>
          <QueryProvider>
            <Navbar />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
