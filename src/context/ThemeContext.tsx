import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import {
  ThemeColors,
  getAndroidTheme,
  getStatusBarStyle,
  getStatusBarBackgroundColor,
} from "../utils/theme";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ThemeColors;
  statusBarStyle: "light-content" | "dark-content";
  statusBarBackgroundColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await SecureStore.getItemAsync("darkMode");
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = async () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      await SecureStore.setItemAsync("darkMode", JSON.stringify(newDarkMode));
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const colors = getAndroidTheme(isDarkMode);
  const statusBarStyle = getStatusBarStyle(isDarkMode);
  const statusBarBackgroundColor = getStatusBarBackgroundColor(isDarkMode);

  if (isLoading) {
    return null; // or a loading component
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        colors,
        statusBarStyle,
        statusBarBackgroundColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
