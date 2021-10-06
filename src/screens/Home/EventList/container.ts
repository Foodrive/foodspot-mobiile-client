import { connect, ConnectedProps } from "react-redux";
import EventList from "./EventList";
import {
  setCurrentEventId,
  setCurrentInvitationId,
} from "@app/redux/slices/events.slice";

import { RootState } from "@app/redux/store";

const mapStateToProps = (state: RootState) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = { setCurrentEventId, setCurrentInvitationId };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type EventListPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EventList);
