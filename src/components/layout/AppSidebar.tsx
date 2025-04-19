import * as React from "react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { 
  LayoutDashboard, 
  Settings, 
  Building, 
  Users, 
  Wallet, 
  FileText,
  Calculator,
  ScrollText
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center h-14 px-4">
          <p className="text-lg font-semibold">LOGO</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")
                    }
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Properties">
                  <NavLink
                    to="/properties"
                    className={({ isActive }) =>
                      cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")
                    }
                  >
                    <Building className="h-4 w-4" />
                    <span>Properties</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Tenants">
                  <NavLink
                    to="/tenants"
                    className={({ isActive }) =>
                      cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")
                    }
                  >
                    <Users className="h-4 w-4" />
                    <span>Tenants</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Leases">
                  <NavLink
                    to="/leases"
                    className={({ isActive }) =>
                      cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")
                    }
                  >
                    <ScrollText className="h-4 w-4" />
                    <span>Leases</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Payments">
                  <NavLink
                    to="/payments"
                    className={({ isActive }) =>
                      cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")
                    }
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Payments</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reports">
                  <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                      cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")
                    }
                  >
                    <FileText className="h-4 w-4" />
                    <span>Reports</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Calculations">
                  <NavLink
                    to="/calculations"
                    className={({ isActive }) =>
                      cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")
                    }
                  >
                    <Calculator className="h-4 w-4" />
                    <span>Calculations</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")
                    }
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-sidebar-foreground/60">
          Property Manager v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
