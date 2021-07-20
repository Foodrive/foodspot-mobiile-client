import { DefaultTheme } from "@react-navigation/native";

export const colors = {
  background: "#F8F8F8",
  white: "#fff",
  dark: "#222020",
};

export enum IconSize {
  Small = 12,
  Medium = 24,
  Large = 36,
  ExtraLarge = 50
}

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};
