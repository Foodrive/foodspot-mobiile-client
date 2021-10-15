import { UserInvitation } from "@app/graphql/queries";
import { AttendeeCount } from "@app/utils/types";
import { InvitationStatus } from "@app/utils/constants";
import { AttendeeInfo } from "@app/types/attendee.types";

export const getAttendeeCount = (
  invitations: UserInvitation[],
  maxCapacity: number,
): AttendeeCount => {
  let numPending = 0;
  let numAttendees = 0;

  for (const invitation of invitations) {
    if (invitation.status === InvitationStatus.pending) {
      numPending++;
    }
    numAttendees += invitation.numAttendees;
  }

  return {
    claimsLeft: maxCapacity - numAttendees,
    pending: numPending,
  };
};

export const getAttendeeInfoFromEvent = (event: any): AttendeeInfo => {
  if (event.attendeeInfo) {
    return event.attendeeInfo;
  }
  return {
    claimedCapacity: 0,
    maxCapacity: event.maxCapacity ?? 0,
    pendingCapacity: 0,
    pendingInvites: 0,
  };
};
