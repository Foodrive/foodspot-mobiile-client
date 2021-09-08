import { gql } from "@apollo/client";

export const UPDATE_USER = gql` 
  mutation UpdateUserMutation(
    $UserPassword: String 
    $UserPhoneNumber: String
    $UserEmail: String
    $UserAllergies: [String]
    $UserFirstName: String
    $UserLastName: String
    ) {
    updateUser(
      password: $UserPassword
      phoneNumber: $UserPhoneNumber
      email: $UserEmail
      allergies: $UserAllergies
      ) {
        password
        phoneNumber
        email
        allergies
        firstName
        lastName
        }
      }
    `;