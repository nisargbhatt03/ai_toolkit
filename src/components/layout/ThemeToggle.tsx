"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="relative rounded-xl border border-border/50 bg-background/50 hover:bg-accent transition-colors"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-indigo-400 transition-all" />
      ) : (
        <Sun className="h-5 w-5 text-amber-500 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
