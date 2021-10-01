import { gql } from "@apollo/client";
import { UserInvitation } from ".";

export interface FoodDrive {
  id: string;
  isOpen: boolean;
  name: string;
  startDate: string;
  endDate: string;
  location: {
    address: string;
    coords: {
      longitude: string;
      latitude: string;
    };
  };
}
export interface OrganiserFoodDrives {
  id: string;
  name: string;
  startDate: string;
  maxCapacity: number;
  invitations: UserInvitation[];
}

export interface GetFoodDrives {
  getFoodDrives: FoodDrive[];
}

export interface GetOrganiserFoodDrives {
  getFoodDrives: OrganiserFoodDrives[];
}
export const GET_FOOD_DRIVES = gql`
  query Query {
    getFoodDrives {
      id
      isOpen
      name
      startDate
      endDate
      location {
        address
        coords {
          longitude
          latitude
        }
      }
    }
  }
`;

export const GET_FOOD_DRIVE_BY_ID = gql`
  query Query($getFoodDriveByIdEventId: ID!) {
    getFoodDriveById(eventId: $getFoodDriveByIdEventId) {
      name
      description
      startDate
      endDate
      location {
        address
      }
      contactNumber
      food {
        allergens
      }
    }
  }
`;

export const GET_FOOD_DRIVE_BY_ID_FULL_DETAILS = gql`
  query Query($eventId: ID!) {
    getFoodDriveById(eventId: $eventId) {
      name
      description
      startDate
      endDate
      type
      location {
        address
      }
      contactNumber
      email
      food {
        allergens
      }
      facebookPage
      maxCapacity
      autoAccept
    }
  }
`;

export const GET_FOOD_DRIVE_BY_USER_ID = gql`
  query getFoodDrivesByUserId($getFoodDrivesUserId: ID) {
    getFoodDrives(userId: $getFoodDrivesUserId) {
      id
      name
      startDate
      maxCapacity
      invitations {
        id
        numAttendees
        status
      }
    }
  }
`;
