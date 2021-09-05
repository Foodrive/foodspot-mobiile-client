import { connect, ConnectedProps } from "react-redux";
import CreationSummary from "./CreationSummary";
import { RootState } from "@app/redux/store";

const mapStateToProps = (state: RootState) => ({
  createData: state.events.createData,
  pageTitle: state.events.ceEventFlowTitle,
});

const connector = connect(mapStateToProps);

export type CreationSummaryReduxProps = ConnectedProps<typeof connector>;

export default connector(CreationSummary);
