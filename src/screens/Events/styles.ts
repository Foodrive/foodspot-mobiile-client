import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  text: {
    fontSize: RFValue(24),
    textAlign: "center",
  },
  buttonContainer: {
    padding: 0,
    margin: 0,
    marginTop: 30,
    width: "100%",
  },
  buttonStyleClaimed: {
    borderRadius: 5,
    width: "100%",
    backgroundColor: '#382C1E'
  },
  buttonStyleUnclaimed: {
      borderRadius: 5,
      width: "100%",
      backgroundColor: '#59BBD0'
  }
});

export default styles;
