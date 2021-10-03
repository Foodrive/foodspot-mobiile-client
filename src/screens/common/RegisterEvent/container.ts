import { connect, ConnectedProps } from "react-redux";
import RegisterEvent from "./RegisterEvent";
import { RootState } from "@app/redux/store";
import { setCurrentInvitationId } from "@app/redux/slices/events.slice";

const mapStateToProps = (state: RootState) => ({
  eventId: state.events.currentEventId,
  userId: state.user.currentUser?.id ?? "",
});

const mapDispatchToProps = { setCurrentInvitationId};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type RegisterEventPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegisterEvent);
