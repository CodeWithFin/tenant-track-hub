import * as React from "react"
import { useState } from "react"
import { useLocation, NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { 
  LayoutDashboard, 
  Settings, 
  Building, 
  Users, 
  Wallet, 
  FileText,
  Calculator
} from "lucide-react"

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { pathname } = useLocation()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  React.useEffect(() => {
    if (!isDesktop) {
      setIsCollapsed(false)
    } else {
      setIsCollapsed(true)
    }
  }, [isDesktop])

  return (
    <aside 
      className={cn(
        "bg-white border-r h-screen fixed top-0 left-0 z-20 flex flex-col shadow-sm",
        "transition-transform duration-300 transform",
        isCollapsed ? "w-20 translate-x-0" : "w-60 translate-x-0",
        !isDesktop ? "-translate-x-full" : ""
      )}
    >
      <div className="flex items-center h-14 px-6 md:px-8 border-b">
        <p className="text-xl font-semibold">LOGO</p>
      </div>
      <div className="px-4 py-2">
        <nav className="grid gap-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                "transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="font-medium">Dashboard</span>
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                "transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )
            }
          >
            <Building className="h-4 w-4" />
            <span className="font-medium">Properties</span>
          </NavLink>
          <NavLink
            to="/tenants"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                "transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )
            }
          >
            <Users className="h-4 w-4" />
            <span className="font-medium">Tenants</span>
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                "transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )
            }
          >
            <Wallet className="h-4 w-4" />
            <span className="font-medium">Payments</span>
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                "transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )
            }
          >
            <FileText className="h-4 w-4" />
            <span className="font-medium">Reports</span>
          </NavLink>
          
          <NavLink
            to="/calculations"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                "transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )
            }
          >
            <Calculator className="h-4 w-4" />
            <span className="font-medium">Calculations</span>
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                "transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )
            }
          >
            <Settings className="h-4 w-4" />
            <span className="font-medium">Settings</span>
          </NavLink>
        </nav>
      </div>
      <div className="mt-auto px-4 py-2">
        {/* Collapsed Button */}
      </div>
    </aside>
  );
}
