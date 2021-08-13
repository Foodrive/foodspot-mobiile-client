import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  inputTitle: {
    fontSize: RFValue(16),
    textAlign: "left",
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: "bold",
  },
  profileTitle:{
    fontSize: RFValue(20),
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 30,
  },
  title: {
    fontSize: RFValue(24),
    textAlign: "center",
    fontWeight: "bold",
    position: "absolute",
    top: 25,
    left: 90
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 20
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 120,
    marginHorizontal: 10,
  },
  divider:{
    margin: 10,
  },
  allergyList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 25,
    marginRight: 60,
    marginBottom: 30,
    alignContent: "space-between",

  }
});

export default styles;
