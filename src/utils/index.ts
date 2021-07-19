import { DefaultTheme } from "@react-navigation/native";

export const colors = {
  background: "#F8F8F8",
  white: "#fff",
  dark: "#222020",
  lightbrown: "#C1A495",
  darkBrown: "#382C1E",
  teal: "#59BBD0",
  orange: "#FFAD61"
};

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};
