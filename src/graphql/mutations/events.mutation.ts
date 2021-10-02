import { gql } from "@apollo/client";

export const UPDATE_FOOD_DRIVE = gql`
  mutation Mutation(
    $id: ID!
    $name: String
    $description: String
    $startDate: String
    $endDate: String
    $location: LocationInput
    $contactNumber: String
    $email: String
    $maxCapacity: Int
    $autoAccept: Boolean
    $food: [FoodInput!]
    $facebookPage: String
  ) {
    updateFoodDrive(
      id: $id
      name: $name
      description: $description
      startDate: $startDate
      endDate: $endDate
      location: $location
      contactNumber: $contactNumber
      email: $email
      maxCapacity: $maxCapacity
      autoAccept: $autoAccept
      food: $food
      facebookPage: $facebookPage
    ) {
      id
      name
    }
  }
`;

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

export const DELETE_FOOD_DRIVE = gql`
  mutation Mutation($eventId: ID!) {
    deleteFoodDrive(id: $eventId)
  }
`;
