import { StyleSheet } from "react-native";
import { colors, grid, montserrat } from "@app/utils";
import { RFValue } from "react-native-responsive-fontsize";

interface StyleProps {
  hasKeyboard: boolean;
}

export const useStyles = ({ hasKeyboard }: StyleProps) =>
  StyleSheet.create({
    background: {
      flex: 1,
      alignItems: "center",
    },
    content: {
      alignItems: "center",
      width: "100%",
      padding: grid.genericSpacing,
    },
    logo: {
      marginVertical: grid.genericSpacing,
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      fontSize: RFValue(38),
      textTransform: "uppercase",
      textAlign: "center",
      fontFamily: montserrat.bold,
      color: colors.secondary,
    },
    cardContainer: {
      position: "absolute",
      width: "100%",
      top: hasKeyboard ? "20%" : "40%",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    card: {
      flexDirection: "column",
    },
  });
