import { gql } from "@apollo/client";
import { InvitationStatus } from "@app/utils/constants";

export interface UserInvitation {
  getInvitations: [
    {
      id: string;
      name: string;
      attendeeId: string;
      status: InvitationStatus;
      event: {
        id: string;
        name: string;
        startDate: string;
        endDate: string;
      };
    },
  ];
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
