import { connect, ConnectedProps } from "react-redux";
import ContactDetails from "./ContactDetails";
import { RootState } from "@app/redux/store";
import { updateCreateData } from "@app/redux/slices/events.slice";

const mapStateToProps = (state: RootState) => ({
  createData: state.events.createData,
  pageTitle: state.events.ceEventFlowTitle,
});

const mapDispatchToProps = { updateCreateData };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ContactDetailsReduxProps = ConnectedProps<typeof connector>;

export default connector(ContactDetails);
