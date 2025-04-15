
import { 
  Building2, 
  Home, 
  Users, 
  Wallet, 
  FileText, 
  Wrench, 
  BarChart3 
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger, 
  SidebarFooter 
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Properties", icon: Building2, path: "/properties" },
  { title: "Tenants", icon: Users, path: "/tenants" },
  { title: "Payments", icon: Wallet, path: "/payments" },
  { title: "Receipts", icon: FileText, path: "/receipts" },
  { title: "Maintenance", icon: Wrench, path: "/maintenance" },
  { title: "Reports", icon: BarChart3, path: "/reports" }
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border py-4">
        <div className="flex items-center px-5">
          <div className="text-primary font-bold text-xl">TenantTrackHub</div>
          <SidebarTrigger className="ml-auto">
            <button className="p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <span className="sr-only">Toggle Sidebar</span>
            </button>
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border py-3 px-5">
        <div className="text-xs text-sidebar-foreground/60">© 2025 TenantTrackHub</div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
