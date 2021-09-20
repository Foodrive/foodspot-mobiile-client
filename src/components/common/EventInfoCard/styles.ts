import { StyleSheet } from "react-native";
import { colors, montserrat } from "@app/utils";
import { RFValue } from "react-native-responsive-fontsize";

export const useStyles = () =>
  StyleSheet.create({
    dateText: {
      fontFamily: montserrat.bold,
      fontSize: RFValue(16),
    },
    timeText: {
      fontFamily: montserrat.regular,
      color: colors.darkAccent,
      fontSize: RFValue(16),
    },
    valueText: {
      fontFamily: montserrat.regular,
      color: colors.dark,
      fontSize: RFValue(16),
    },
  });
