"use client";

import { Code } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon } from "@/components/animate-ui/icons/moon";
import { Sun } from "@/components/animate-ui/icons/sun";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MonitorCheckIcon } from "@/components/ui/monitor-check";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderIcon = () => {
    switch (theme) {
      case "light":
        return (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300 group-hover:animate-spin" />
        );
      case "dark":
        return (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-300 group-hover:animate-bounce" />
        );
      case "system":
        return (
          <MonitorCheckIcon className="h-[1.2rem] w-[1.2rem] transition-all duration-300 group-hover:animate-pulse" />
        );
      case "html":
        return (
          <Code className="h-[1.2rem] w-[1.2rem] transition-all duration-300 group-hover:animate-pulse" />
        );
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="group">
          {renderIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("html")}>
          HTML
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
