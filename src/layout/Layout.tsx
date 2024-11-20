import Navbar from "@/components/Navbar/Navbar";
import AppSidebar from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full block h-full">
        <Navbar comp={<SidebarTrigger className="text-2xl" size={"lg"} />} />
        <div className="h-full p-5 bg-red-400">{children}</div>
      </main>
    </SidebarProvider>
  );
}
