import { gql } from "@apollo/client";
import { InvitationStatus } from "@app/utils/constants";

export interface CreateInvitation {
  id: string;
  code: string;
  status: InvitationStatus;
}

export const CREATE_INVITATION = gql`
  mutation Mutation($createInvitationEventId: ID!, $createInvitationUserId: ID!, $createInvitationNumAttendees: Int!) {
  createInvitation(eventId: $createInvitationEventId, userId: $createInvitationUserId, numAttendees: $createInvitationNumAttendees) {
    id
    code
    status
  }
}
`;
