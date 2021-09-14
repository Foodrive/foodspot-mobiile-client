import { StyleSheet } from "react-native";
import { grid, montserrat } from "@app/utils";
import { RFValue } from "react-native-responsive-fontsize";

interface StyleProps {
  labelColor: string;
}

export const useStyles = ({ labelColor }: StyleProps) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginVertical: 5,
    },
    labelText: {
      marginBottom: grid.marginBottom,
      fontSize: RFValue(14),
      fontFamily: montserrat.semiBold,
      color: labelColor,
    },
    progressBar: {
      minHeight: 6,
      borderRadius: 3,
    },
  });
