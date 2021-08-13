import { gql } from "@apollo/client";

export const GET_FOOD_DRIVES = gql`
  query Query {
    getFoodDrives {
      id
      name
      description
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
