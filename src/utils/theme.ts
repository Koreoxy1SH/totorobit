import { Platform } from "react-native";

export interface ThemeColors {
  // Background colors
  background: string;
  surface: string;
  card: string;

  // Text colors
  primaryText: string;
  secondaryText: string;
  accentText: string;

  // Border colors
  border: string;
  divider: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Interactive colors
  primary: string;
  primaryDark: string;
  ripple: string;

  // Special colors
  shadow: string;
  overlay: string;
}

export const lightTheme: ThemeColors = {
  // Background colors
  background: "#F5F5F5",
  surface: "#FFFFFF",
  card: "#FFFFFF",

  // Text colors
  primaryText: "#333333",
  secondaryText: "#666666",
  accentText: "#4CAF50",

  // Border colors
  border: "#E0E0E0",
  divider: "#F0F0F0",

  // Status colors
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#FF6B6B",
  info: "#2196F3",

  // Interactive colors
  primary: "#4CAF50",
  primaryDark: "#2E7D32",
  ripple: "rgba(0, 0, 0, 0.1)",

  // Special colors
  shadow: "#000000",
  overlay: "rgba(0, 0, 0, 0.5)",
};

export const darkTheme: ThemeColors = {
  // Background colors
  background: "#121212",
  surface: "#1E1E1E",
  card: "#2D2D2D",

  // Text colors
  primaryText: "#FFFFFF",
  secondaryText: "#B0B0B0",
  accentText: "#81C784",

  // Border colors
  border: "#404040",
  divider: "#2A2A2A",

  // Status colors
  success: "#81C784",
  warning: "#FFB74D",
  error: "#E57373",
  info: "#64B5F6",

  // Interactive colors
  primary: "#81C784",
  primaryDark: "#4CAF50",
  ripple: "rgba(255, 255, 255, 0.1)",

  // Special colors
  shadow: "#000000",
  overlay: "rgba(0, 0, 0, 0.7)",
};

export const getThemeColors = (isDarkMode: boolean): ThemeColors => {
  return isDarkMode ? darkTheme : lightTheme;
};

export const getStatusBarStyle = (isDarkMode: boolean) => {
  return isDarkMode ? "light-content" : "dark-content";
};

export const getStatusBarBackgroundColor = (isDarkMode: boolean) => {
  return isDarkMode ? "#121212" : "#F5F5F5";
};

// Android-specific theme adjustments
export const getAndroidTheme = (isDarkMode: boolean) => {
  if (Platform.OS === "android") {
    return {
      ...getThemeColors(isDarkMode),
      // Android-specific color adjustments
      surface: isDarkMode ? "#1A1A1A" : "#FFFFFF",
      card: isDarkMode ? "#2A2A2A" : "#FFFFFF",
      border: isDarkMode ? "#3A3A3A" : "#E0E0E0",
    };
  }
  return getThemeColors(isDarkMode);
};
