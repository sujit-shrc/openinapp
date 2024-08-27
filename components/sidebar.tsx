"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Upload,
  FileText,
  Calendar,
  Bell,
  Settings,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Upload", icon: Upload, path: "/dashboard/upload" },
  { name: "Invoice", icon: FileText, path: "/dashboard/invoice" },
  { name: "Schedule", icon: Calendar, path: "/dashboard/schedule" },
  { name: "Notification", icon: Bell, path: "/dashboard/notification" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSidebarToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="relative h-full">
      {/* Hamburger button for small screens */}
      <div className="md:hidden flex items-center p-4">
        <button
          onClick={handleMobileMenuToggle}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar menu for larger screens or when mobile menu is open */}
      <div
        className={`bg-white dark:bg-gray-950 fixed md:relative h-full transition-transform duration-200 transform px-1 ${
          collapsed ? "w-16" : "w-64"
        } ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-center md:justify-between p-4">
          {!collapsed && <span className="text-xl font-bold">Base</span>}
          <button
            onClick={handleSidebarToggle}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <ul className="mt-6">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center my-0.5 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-300 rounded-md px-2 md:px-4 py-3 ${
                  pathname === item.path
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : ""
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ml-2 sm:ml-0.5 ${!collapsed && "mr-3"} `}
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute left-1 bottom-4 w-full">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
