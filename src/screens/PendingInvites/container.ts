import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@app/redux/store";
import PendingInvites from "./PendingInvites";

const mapStateToProps = (state: RootState) => ({
  eventId: state.events.currentEventId,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PendingInvitesPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PendingInvites);
