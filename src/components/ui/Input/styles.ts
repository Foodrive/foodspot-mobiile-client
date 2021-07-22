import { StyleSheet } from "react-native";
import { colors, montserrat } from "@app/utils";

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 15,
    borderColor: colors.darkAccent,
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    paddingLeft: 5,
    fontFamily: montserrat.regular,
  },
});

export default styles;
