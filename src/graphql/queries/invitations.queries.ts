import { gql } from "@apollo/client";
import { InvitationStatus } from "@app/utils/constants";

export interface Invitation {
  id: string;
  code: string;
  numAttendees: number;
  status: InvitationStatus;
  claimedDate: string;
}

export const GET_INVITATION_BY_ID = gql`
  query Query($getInvitationByIdInvId: ID!) {
    getInvitationById(invId: $getInvitationByIdInvId) {
      id
      code
      numAttendees
      status
      claimedDate
    }
  }
`;

export interface UserInvitation {
  id: string;
  name: string;
  attendeeId: string;
  status: InvitationStatus;
  numAttendees: number;
  event: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  };
}
export interface GetUserInvitation {
  getInvitations: UserInvitation[];
}

export const GET_INVITATIONS_BY_USER = gql`
  query($getInvitationsUserId: ID!) {
    getInvitations(userId: $getInvitationsUserId) {
      id
      attendeeId
      status
      event {
        id
        name
        startDate
        endDate
      }
    }
  }
`;
