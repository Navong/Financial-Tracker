"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure that the component mounts before attempting to render theme-related UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`flex items-center space-x-2 transition-all duration-500 ${
        theme === "dark" ? "text-white" : "text-gray-800"
      }`}
    >
      {theme === "dark" ? (
        <Button
          variant="ghost"
          onClick={() => setTheme("light")}
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          <SunIcon className="mr-2" />
          Light Mode
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={() => setTheme("dark")}
          className="bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          <MoonIcon className="mr-2" />
          Dark Mode
        </Button>
      )}
    </div>
  );
}