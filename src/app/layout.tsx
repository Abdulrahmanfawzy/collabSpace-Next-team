import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import { QueryProvider } from "../providers/query-provider";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <QueryProvider>
        <Navbar />
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}
