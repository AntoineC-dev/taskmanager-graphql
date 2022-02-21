import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($username: NonEmptyString!, $email: EmailAddress!, $password: Password!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;
