
import React from "react";
import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className="flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
