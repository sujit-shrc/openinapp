// components/ThemeToggle.tsx
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/theme-provider";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex items-center"
    >
      <Sun
        className={`w-5 h-5 rounded-full p-0.5 ${theme === "light" ? "bg-gray-900 text-white" : "text-white"}`}
      />
      <Moon
        className={`w-5 h-5 ml-2 rounded-full p-0.5 ${theme === "dark" ? "bg-gray-600" : "text-gray-400"}`}
      />
    </button>
  );
};
