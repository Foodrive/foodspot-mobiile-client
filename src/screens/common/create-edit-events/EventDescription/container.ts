import { connect, ConnectedProps } from "react-redux";
import EventDescription from "./EventDescription";
import { RootState } from "@app/redux/store";
import {
  updateCreateData,
} from "@app/redux/slices/events.slice";

const mapStateToProps = (state: RootState) => ({
  pageTitle: state.events.ceEventFlowTitle,
  createData: state.events.createData,
});

const mapDispatchToProps = { updateCreateData };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type EventDescriptionReduxProps = ConnectedProps<typeof connector>;

export default connector(EventDescription);
