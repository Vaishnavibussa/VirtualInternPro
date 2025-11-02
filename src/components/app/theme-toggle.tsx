"use client"

import { useTheme } from "next-themes"
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // Ensure the toggle is in the correct state on initial load
  // The checkbox is "checked" when the theme is "dark"
  const isChecked = theme === 'dark';

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };
  
  return (
    <div className="toggle toggle--text">
      <input 
        type="checkbox" 
        id="theme-toggle" 
        className="toggle--checkbox"
        checked={isChecked}
        onChange={handleToggle}
        aria-label="Toggle theme"
      />
      <label 
        className="toggle--btn" 
        htmlFor="theme-toggle">
          <Sun className="toggle-icon sun" />
          <Moon className="toggle-icon moon" />
      </label>
    </div>
  )
}
