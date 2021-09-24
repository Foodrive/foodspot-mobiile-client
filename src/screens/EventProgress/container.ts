import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@app/redux/store";
import EventProgress from "./EventProgress";

const mapStateToProps = (state: RootState) => ({
  eventId: state.events.currentEventId,
});

const connector = connect(mapStateToProps);

export type EventProgressPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EventProgress);
