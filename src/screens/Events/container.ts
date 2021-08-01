import { connect, ConnectedProps } from "react-redux";
import Events from "./Events";
import { setCurrentEventId } from "@app/redux/slices/events.slice";

const mapStateToProps = () => ({});

const mapDispatchToProps = { setCurrentEventId };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type EventsPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Events);
