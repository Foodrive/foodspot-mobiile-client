import { connect } from "react-redux";
import LoginScreen from "./LoginScreen";
import { setCurrentUser } from "@app/redux/slices/user.slice";

const mapStateToProps = () => ({});

const mapDispatch = { setCurrentUser };

export default connect(mapStateToProps, mapDispatch)(LoginScreen);
