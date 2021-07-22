import { DefaultTheme } from "@react-navigation/native";

export const colors = {
  background: "#F8F8F8",
  white: "#fff",
  black: "#000000",
  dark: "#222020",
  darkAccent: "#AA9F9E",
  lightbrown: "#C1A495",
  darkBrown: "#382C1E",
  teal: "#59BBD0",
  orange: "#FFAD61",
  ui: {
    horizontalBar: "#D6D8D8",
  }
};

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export const grid = {
  outerRule: 25,
  genericSpacing: 20
};

export const montserrat = {
  thin: "Montserrat_100Thin",
  thinItalic: "Montserrat_100Thin_Italic",
  extraLight: "Montserrat_200ExtraLight",
  extraLightItalic: "Montserrat_200ExtraLight_Italic",
  light: "Montserrat_300Light",
  lightItalic: "Montserrat_300Light_Italic",
  regular: "Montserrat_400Regular",
  regularItalic: "Montserrat_400Regular_Italic",
  medium: "Montserrat_500Medium",
  mediumItalic: "Montserrat_500Medium_Italic",
  semiBold: "Montserrat_600SemiBold",
  semiBoldItalic: "Montserrat_600SemiBold_Italic",
  bold: "Montserrat_700Bold",
  boldItalic: "Montserrat_700Bold_Italic",
  extraBold: "Montserrat_800ExtraBold",
  extraBoldItalic: "Montserrat_800ExtraBold_Italic",
  black: "Montserrat_900Black",
  blackItalic: "Montserrat_900Black_Italic",
};

export const nokora = {
  heading: "Nokora_700Bold",
};