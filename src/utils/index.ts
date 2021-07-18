import { DefaultTheme } from "@react-navigation/native";

export const colors = {
  background: "#F8F8F8",
  white: "#fff",
  dark: "#222020",
  darkAccent: "#AA9F9E",
};

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};
