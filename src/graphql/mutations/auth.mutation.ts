import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      user {
        username
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation SignupMutation(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      accessToken
      user {
        username
      }
    }
  }
`;
