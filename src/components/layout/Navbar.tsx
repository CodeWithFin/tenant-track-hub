import { User, Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { showNotification, NotificationTypes } from "@/lib/utils/notificationUtils";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: '1', message: NotificationTypes.RENT_DUE_SOON, date: new Date() },
    { id: '2', message: NotificationTypes.MAINTENANCE_REQUEST_CREATED, date: new Date() }
  ]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleNotificationClick = (notification: { id: string, message: string }) => {
    showNotification(notification.message, 'default');
    setNotifications(prev => prev.filter(n => n.id !== notification.id));
  };

  return (
    <div className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex-1"></div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No new notifications
                </div>
              ) : (
                notifications.map(notification => (
                  <DropdownMenuItem 
                    key={notification.id} 
                    onSelect={() => handleNotificationClick(notification)}
                    className="cursor-pointer"
                  >
                    {notification.message}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 h-10 w-10 overflow-hidden">
                <User className="h-5 w-5 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl p-1 shadow-lg border-border">
              <div className="px-3 py-2 text-sm font-medium">
                {user?.email?.split('@')[0] || 'User'}
              </div>
              <div className="px-3 py-1 text-xs text-muted-foreground mb-1">
                {user?.email || 'user@example.com'}
              </div>
              <DropdownMenuItem className="py-2 rounded-lg cursor-pointer" onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem className="py-2 rounded-lg cursor-pointer" onClick={() => navigate('/admin')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="py-2 text-destructive rounded-lg cursor-pointer" onClick={handleLogout}>
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
