import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@app/redux/store";
import EventProgress from "./EventProgress";
import {
  setCreateData,
  resetCreateData,
  setCeEventFlowTitle,
} from "@app/redux/slices/events.slice";

const mapStateToProps = (state: RootState) => ({
  eventId: state.events.currentEventId,
  event: state.events.createData,
});

const mapDispatchToProps = { setEvent: setCreateData, resetCreateData, setCeEventFlowTitle };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type EventProgressPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EventProgress);
