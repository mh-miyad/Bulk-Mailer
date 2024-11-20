import Navbar from "@/components/Navbar/Navbar";
import AppSidebar from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full block h-full">
        <Navbar comp={<SidebarTrigger />} />
        <div className="bg-red-400 h-[calc(100svh-theme(spacing.4))] ">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
