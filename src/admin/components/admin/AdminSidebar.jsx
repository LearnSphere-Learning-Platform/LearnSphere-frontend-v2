import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  Home,
  Settings,
  Users,
  FileText,
  Bell,
  CreditCard,
  FlagTriangleRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { cn } from "../../lib/utils";

const managementItems = [
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
  { title: "Notifications", url: "/admin/notifications", icon: Bell },
  { title: "Flagged", url: "/admin/flagged", icon: FlagTriangleRight },
];

const mainItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Courses", url: "/admin/courses", icon: BookOpen },
  { title: "Instructors", url: "/admin/instructors", icon: GraduationCap },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
];

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path) => currentPath === path;

  const getNavCls = ({ isActive }) => {
    return (
              (isActive
          ? "bg-[#C8CBB8] text-[#333A2F] font-bold shadow-sm"
          : "text-[#333A2F] hover:bg-[#C8CBB8] hover:text-[#333A2F] hover:font-semibold transition-all duration-300 ease-in-out"
        ) +
              " flex items-center gap-3 px-4 py-2 rounded-lg text-lg cursor-pointer"
    );
  };

  return (
    <Sidebar
      className={`h-screen top-0 sticky z-40 ${collapsed ? "w-16" : "w-64"} bg-[#EBEDDF] border-r border-gray-200`}
      collapsible="icon"
    >
      <SidebarContent className="bg-[#EBEDDF] border-r border-gray-200 h-full flex flex-col">
        {/* Header */}
        <div className="p-4.5 border-b border-gray-200 bg-white rounded-b-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#333A2F] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-2xl font-bold text-[#333A2F] leading-tight">LearnSphere</h1>
                <p className="text-xs text-gray-600">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-6 h-6 text-[#333A2F] transition-colors duration-300" />
                      {!collapsed && <span className="transition-all duration-300">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-6 h-6 text-[#333A2F]" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
  );
}

export const SidebarGroupContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pl-2 space-y-1", className)}
      {...props}
    />
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";

export const SidebarGroupLabel = ({ children }) => (
  <div className="px-4 pt-6 pb-2 text-xs font-semibold uppercase text-[#333A2F] tracking-wider">
    {children}
  </div>
);
export default AdminSidebar;
