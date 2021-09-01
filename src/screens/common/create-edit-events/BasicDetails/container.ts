import { connect, ConnectedProps } from "react-redux";
import BasicDetails from "./BasicDetails";
import { RootState } from "@app/redux/store";
import {
  initCreate,
  updateCreateData,
  resetCreateData,
  setCeEventFlowTitle,
} from "@app/redux/slices/events.slice";

const mapStateToProps = (state: RootState) => ({
  createData: state.events.createData,
  pageTitle: state.events.ceEventFlowTitle,
});

const mapDispatchToProps = {
  initCreate,
  updateCreateData,
  resetCreateData,
  setCeEventFlowTitle,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type BasicDetailsReduxProps = ConnectedProps<typeof connector>;

export default connector(BasicDetails);
