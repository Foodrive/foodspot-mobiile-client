import { connect } from "react-redux";
import RegisterScreen from "./RegisterScreen";
import { setCurrentUser } from "@app/redux/slices/user.slice";

const mapStateToProps = () => ({});

const mapDispatchToProps = { setCurrentUser };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
