import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/DashboardSidebar";
import { TooltipProvider } from "radix-ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
