"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; 

/* Componente para alternar entre os temas Claro e Escuro. */

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 opacity-0 pointer-events-none"
      />
    );
  }

  const isDark = theme === "dark" || theme === "system";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-purple-700"
      // Troca o tema entre 'light' e 'dark'
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Alternar Tema"
    >
      {isDark ? (
        // Ícone Sol (aparece no modo escuro)
        <Sun className="h-6 w-6 text-purple-700 dark:text-purple-100" />
      ) : (
        // Ícone Lua (aparece no modo claro)
        <Moon className="h-4 w-4 text-purple-500" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
