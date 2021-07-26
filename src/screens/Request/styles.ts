import { StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  text: {
    fontSize: RFValue(24),
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
    flex: 1
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  childContainer: {
    position: "absolute"
  },
  button: {
    position: "absolute",
    width: "85%",
    bottom: 100,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10
  }
});

export default styles;
