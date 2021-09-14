import { StyleSheet } from "react-native";
import { colors, montserrat } from "@app/utils";

export const useStyles = () =>
  StyleSheet.create({
    labelContainer: {
      flexDirection: "row",
      marginBottom: 5,
      textTransform: "capitalize",
      alignItems: "flex-end",
    },
    labelText: {
      marginTop: 10,
      fontFamily: montserrat.bold,
      color: colors.dark,
    },
    valueContainer: {
      marginLeft: 25,
    },
  });
