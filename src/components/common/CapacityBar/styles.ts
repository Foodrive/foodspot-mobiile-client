import { StyleSheet } from "react-native";
import { montserrat } from "@app/utils";
import { RFValue } from "react-native-responsive-fontsize";

export const useStyles = () =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
      flexDirection: "column",
    },
    labelText: {
      fontFamily: montserrat.medium,
      fontSize: RFValue(14),
    },
  });
