
import React from "react";
import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (isHomePage) {
    return (
      <div className="min-h-screen bg-recruiter-background">
        <header className="border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between p-4">
            <div className="font-bold text-xl">
              <span className="gradient-text">People</span>GPT
            </div>
            <Navbar />
          </div>
        </header>
        
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
        <Toaster />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-recruiter-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <header className="border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="font-bold text-xl">
                  <span className="gradient-text">People</span>GPT
                </div>
              </div>
              <Navbar />
            </div>
          </header>
          
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
    </SidebarProvider>
  );
};

export default Layout;
