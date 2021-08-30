import { connect, ConnectedProps } from "react-redux";
import RegisterEvent from "./RegisterEvent";
import { RootState } from "@app/redux/store";

const mapStateToProps = (state: RootState) => ({
  eventId: state.events.currentEventId,
  userId: state.user.currentUser?.id ?? "",
  username: state.user.currentUser?.username ?? "",
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type RegisterEventPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegisterEvent);
