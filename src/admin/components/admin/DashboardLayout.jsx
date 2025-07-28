import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Bell, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any admin session/tokens here
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    // Navigate to home page
    navigate('/login');
  };

  const handleViewAsUser = () => {
    // Navigate to user view
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#EBEDDF] text-[#333A2F] font-sans">
        <AdminSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-20 border-b border-gray-200 bg-white/90 backdrop-blur-sm flex items-center justify-between px-10 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-1" />
            </div>

            <div className="flex items-center gap-3">
              <Link to="/admin/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-6 h-6 text-[#333A2F]" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                    3
                  </span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                    <Avatar className="h-12 w-12 bg-[#EBEDDF]">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#333A2F] text-white font-bold">
                        AD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-xl rounded-xl" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-base font-bold text-[#333A2F]">Admin User</p>
                      <p className="text-xs text-gray-600">admin@learnsphere.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleViewAsUser}
                    className="hover:bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    View as User
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-600 font-semibold hover:bg-red-50 rounded-lg cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-10 bg-[#f5f5f5]">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
