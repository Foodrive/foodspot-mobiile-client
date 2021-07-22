import { StyleSheet } from "react-native";
import { colors, montserrat } from "@app/utils";

interface StyleProps {
  color: "primary" | "secondary" | "danger" | "warning" | "success";
}

const colorMap = {
  primary: colors.teal,
  secondary: colors.secondary,
  danger: colors.danger,
  warning: colors.orange,
  success: colors.success,
};

export const useStyles = ({ color }: StyleProps) => {
  return StyleSheet.create({
    containerStyle: {
      width: "100%",
    },
    buttonStyle: {
      backgroundColor: colorMap[color],
      padding: 10,
    },
    titleStyle: {
      fontFamily: montserrat.semiBold,
      textTransform: "capitalize",
    },
  });
};
