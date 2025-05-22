
import React from 'react';
import { NavLink } from "react-router-dom";
import { 
  FileUp, 
  Search, 
  Users, 
  LayoutDashboard, 
  CreditCard
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  
  const navItems = [
    { 
      title: "Upload Resumes", 
      icon: FileUp, 
      path: "/upload" 
    },
    { 
      title: "Search Talent", 
      icon: Search, 
      path: "/search" 
    },
    { 
      title: "Candidates", 
      icon: Users, 
      path: "/candidates" 
    },
    { 
      title: "Dashboard", 
      icon: LayoutDashboard, 
      path: "/dashboard" 
    },
    { 
      title: "Subscription", 
      icon: CreditCard, 
      path: "/payment" 
    },
  ];

  // Function to determine if a route is active
  const isActiveRoute = (path: string): boolean => {
    return window.location.pathname === path;
  };

  // Generate NavLink className based on active state
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                    <NavLink to={item.path} className={getNavLinkClass}>
                      <item.icon className="size-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
