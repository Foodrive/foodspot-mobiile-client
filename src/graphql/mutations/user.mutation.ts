import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUserMutation(
    $firstName: String
    $lastName: String
    $password: String
    $phoneNumber: String
    $email: String
    $allergies: [String!]
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      password: $password
      phoneNumber: $phoneNumber
      email: $email
      allergies: $allergies
    ) {
      username
      firstName
      lastName
      phoneNumber
      email
      allergies
    }
  }
`;
