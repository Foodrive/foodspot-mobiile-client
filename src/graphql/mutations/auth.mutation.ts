import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;
