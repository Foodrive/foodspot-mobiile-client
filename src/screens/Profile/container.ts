import { connect, ConnectedProps } from "react-redux";
import UserProfile from "./UserProfile";
import { setCurrentUser } from "@app/redux/slices/user.slice";

const mapStateToProps = () => ({});

const mapDispatchToProps = { setCurrentUser };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ProfilePropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserProfile);