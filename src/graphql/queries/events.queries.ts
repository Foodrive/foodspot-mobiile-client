import { gql } from "@apollo/client";

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
export interface GetFoodDrives {
  getFoodDrives: FoodDrive[];
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
