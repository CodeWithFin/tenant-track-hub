
import { User, Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="border-b bg-background sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex-1"></div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm font-medium">
                {user?.name || 'User'}
              </div>
              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                {user?.email || 'user@example.com'}
              </div>
              <DropdownMenuItem className="py-2">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
