import { connect } from "react-redux";
import HomeScreen from "../index";

const mapStateToProps = (state: any) => ({
  ...state.app,
});

export default connect(mapStateToProps)(HomeScreen);
