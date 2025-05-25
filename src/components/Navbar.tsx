
import React from "react";
import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="font-bold text-xl">
            <span className="gradient-text">People</span>GPT
          </div>
        </NavLink>
        
        <nav className="hidden md:flex items-center gap-6">
          <NavLink 
            to="/pricing" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Pricing
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
