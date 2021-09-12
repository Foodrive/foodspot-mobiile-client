import { connect, ConnectedProps } from "react-redux";
import EventDetails from "./EventDetails";
import { RootState } from "@app/redux/store";

const mapStateToProps = (state: RootState) => ({
  eventId: state.events.currentEventId,
  invitationId: state.events.currentInvitationId,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type EventDetailsPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EventDetails);
