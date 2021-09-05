import { StyleSheet } from "react-native";
import { colors, montserrat } from "@app/utils";
import { RFValue } from "react-native-responsive-fontsize";

export const useStyles = () =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.lightbrown,
      alignItems: "flex-end",
    },
    headerText: {
      color: colors.dark,
      fontFamily: montserrat.bold,
      fontSize: RFValue(16),
    },
    acceptTypeContainer: {
      marginVertical: 10,
      alignItems: "flex-end",
    },
  });
