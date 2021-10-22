import { StyleSheet } from "react-native";
import { colors } from "@app/utils";

interface StyleProps {
  isSelected: boolean;
}

export const useStyles = (props: StyleProps) =>
  StyleSheet.create({
    containerStyle: {
      backgroundColor: props.isSelected ? colors.success : colors.white,
    },
    attendeeStyle: {
      color: props.isSelected ? colors.white : colors.dark,
      fontWeight: props.isSelected ? "bold" : "normal",
    },
  });
