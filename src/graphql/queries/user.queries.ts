import { gql } from "@apollo/client";

export const GET_USER = gql`
 query Query($getUserUsername: String!) {
    getUser(username: $getUserUsername) {
      firstName
      lastName
      phoneNumber
      email
      allergies
    }
  }
`;