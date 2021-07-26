import { StyleSheet } from "react-native";
import { montserrat } from "@app/utils";

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "300",
    fontFamily: montserrat.regular,
  },
  containerStyle: {
    elevation: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default styles;
