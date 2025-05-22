
import React from "react";
import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = () => {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <NavLink to="/" className="flex items-center gap-2">
            <div className="font-bold text-xl">
              <span className="gradient-text">People</span>GPT
            </div>
          </NavLink>
        </div>
        
        <div className="flex items-center gap-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
