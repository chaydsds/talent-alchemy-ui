
import React from "react";
import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/Sidebar";
import { SidebarInset, SidebarRail, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useSidebar();
  const isSidebarExpanded = state === "expanded";

  return (
    <div className="min-h-screen flex flex-col bg-recruiter-background">
      <Navbar />
      <div className="flex flex-1 w-full">
        <AppSidebar />
        <SidebarRail />
        <SidebarInset className={`transition-all duration-300 ${isSidebarExpanded ? 'md:ml-60' : 'md:ml-14'}`}>
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-gray-50 py-8 border-t border-gray-100">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <div className="font-bold text-xl">
                    <span className="gradient-text">People</span>GPT
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    AI-powered recruitment platform
                  </p>
                </div>
                <div className="text-gray-500 text-sm">
                  © 2025 PeopleGPT. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
