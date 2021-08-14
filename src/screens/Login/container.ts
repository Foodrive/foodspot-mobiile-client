import { connect, ConnectedProps } from "react-redux";
import LoginScreen from "./LoginScreen";
import { setCurrentUser } from "@app/redux/slices/user.slice";

const mapStateToProps = () => ({});

const mapDispatchToProps = { setCurrentUser };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type LoginScreenPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoginScreen);
