import { StyleSheet } from "react-native";
import { colors, montserrat } from "@app/utils";

export const useStyles = () =>
  StyleSheet.create({
    dateText: {
      fontFamily: montserrat.bold,
    },
    timeText: {
      fontFamily: montserrat.regular,
      color: colors.darkAccent,
    },
    valueText: {
      fontFamily: montserrat.regular,
      color: colors.dark,
    },
  });
