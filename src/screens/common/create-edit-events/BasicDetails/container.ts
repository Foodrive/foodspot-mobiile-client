import { connect, ConnectedProps } from "react-redux";
import BasicDetails from "./BasicDetails";
import { RootState } from "@app/redux/store";
import {
  initCreate,
  updateCreateData,
  resetCreateData,
} from "@app/redux/slices/events.slice";

const mapStateToProps = (state: RootState) => ({
  createData: state.events.createData,
});

const mapDispatchToProps = { initCreate, updateCreateData, resetCreateData };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type BasicDetailsReduxProps = ConnectedProps<typeof connector>;

export default connector(BasicDetails);
