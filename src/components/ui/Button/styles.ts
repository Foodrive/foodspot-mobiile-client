import { StyleSheet } from "react-native";
import { colors, montserrat } from "@app/utils";

interface StyleProps {
  color: "primary" | "secondary" | "danger" | "warning" | "success";
  type: "solid" | "clear" | "outline";
}

const colorMap = {
  primary: colors.teal,
  secondary: colors.secondary,
  danger: colors.danger,
  warning: colors.orange,
  success: colors.success,
};

export const useStyles = ({ color, type }: StyleProps) => {
  return StyleSheet.create({
    containerStyle: {
      width: "100%",
    },
    buttonStyle: {
      padding: 10,
      backgroundColor: type === "solid" ? colorMap[color] : undefined,
    },
    titleStyle: {
      fontFamily: montserrat.semiBold,
      textTransform: "capitalize",
      color: type === "clear" ? colorMap[color] : undefined,
      textDecorationLine: type === "clear" ? "underline" : "none",
    },
  });
};
