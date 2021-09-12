import { connect, ConnectedProps } from "react-redux";
import EventList from "./EventList";
import {
  setCurrentEventId,
  setCurrentInvitationId,
} from "@app/redux/slices/events.slice";

const mapStateToProps = () => ({});

const mapDispatchToProps = { setCurrentEventId, setCurrentInvitationId };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type EventListPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EventList);
