
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
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/dashboard" },
  { title: "Properties", icon: Building2, path: "/properties" },
  { title: "Tenants", icon: Users, path: "/tenants" },
  { title: "Payments", icon: Wallet, path: "/payments" },
  { title: "Receipts", icon: FileText, path: "/receipts" },
  { title: "Maintenance", icon: Wrench, path: "/maintenance" },
  { title: "Reports", icon: BarChart3, path: "/reports" }
];

const AppSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border py-4">
        <div className="flex items-center px-5">
          <div className="text-primary font-bold text-xl">TenantTrackHub</div>
          <SidebarTrigger className="ml-auto">
            <button className="p-2 rounded-full text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <span className="sr-only">Toggle Sidebar</span>
            </button>
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.path} 
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-sidebar-accent/50"
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
