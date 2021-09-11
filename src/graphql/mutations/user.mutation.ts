import { gql } from "@apollo/client";

export const UPDATE_USER = gql` 
  mutation UpdateUserMutation(
    $password: String
    $phoneNumber: String
    $email: String
    $allergies: [String]
    $firstName: String
    $lastName: String
    ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      password: $password
      phoneNumber: $phoneNumber
      email: $email
      allergies: $allergies
      ) {
        phoneNumber
        email
        allergies
        firstName
        lastName
        }
      }
    `;