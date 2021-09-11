import { gql } from "@apollo/client";

export const CREATE_FOOD_DRIVE = gql`
  mutation CreateFoodDriveMutation(
    $name: String!
    $startDate: String!
    $endDate: String!
    $location: LocationInput!
    $organiserId: ID!
    $contactNumber: String!
    $email: String!
    $maxCapacity: Int!
    $food: [FoodInput!]!
    $description: String
    $autoAccept: Boolean
    $facebookPage: String
  ) {
    createFoodDrive(
      name: $name
      startDate: $startDate
      endDate: $endDate
      location: $location
      organiserId: $organiserId
      contactNumber: $contactNumber
      email: $email
      maxCapacity: $maxCapacity
      food: $food
      description: $description
      autoAccept: $autoAccept
      facebookPage: $facebookPage
    ) {
      name
      id
    }
  }
`;
