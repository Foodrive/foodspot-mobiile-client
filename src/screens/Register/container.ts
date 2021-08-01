import { connect, ConnectedProps } from "react-redux";
import RegisterScreen from "./RegisterScreen";
import { setCurrentUser } from "@app/redux/slices/user.slice";

const mapStateToProps = () => ({});

const mapDispatchToProps = { setCurrentUser };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type RegisterPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegisterScreen);
