"use client";
import Navbar from "@/components/Navbar/Navbar";
import { AppSidebar } from "@/components/ui/app-sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full block h-full ">
        <Navbar
          comp={<SidebarTrigger className="text-2xl p-5" size={"lg"} />}
        />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
