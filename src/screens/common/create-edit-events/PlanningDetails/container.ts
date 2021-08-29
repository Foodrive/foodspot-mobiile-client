import { connect, ConnectedProps } from "react-redux";
import PlanningDetails from "./PlanningDetails";
import { RootState } from "@app/redux/store";
import {
  updateCreateData,
} from "@app/redux/slices/events.slice";

const mapStateToProps = (state: RootState) => ({
  createData: state.events.createData,
});

const mapDispatchToProps = { updateCreateData };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PlanningDetailsReduxProps = ConnectedProps<typeof connector>;

export default connector(PlanningDetails);
