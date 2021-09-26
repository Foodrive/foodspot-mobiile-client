import { connect, ConnectedProps } from "react-redux";
import CreationSummary from "./CreationSummary";
import { RootState } from "@app/redux/store";
import { resetCreateData } from "@app/redux/slices/events.slice";

const mapStateToProps = (state: RootState) => ({
  createData: state.events.createData,
  pageTitle: state.events.ceEventFlowTitle,
  currentUser: state.user.currentUser,
  eventId: state.events.currentEventId,
});

const mapDispatchToProps = {
  resetCreateData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type CreationSummaryReduxProps = ConnectedProps<typeof connector>;

export default connector(CreationSummary);
