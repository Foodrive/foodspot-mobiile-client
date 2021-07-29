import { gql } from "@apollo/client";

// TO DO: refactor with state.
export const USER_FOOD_DRIVES = gql`
  query Query($getFoodDrivesUserId: ID) {
    getFoodDrives(userId: $getFoodDrivesUserId) {
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
