"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="w-full overflow-hidden">
          <div className="flex-1 overflow-auto p-4 sm:p-6 w-full">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
