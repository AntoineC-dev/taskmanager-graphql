import { gql } from "@apollo/client";
import { User } from "../../models";
import { RegisterFormInput } from "../../validators";

export type RegisterData = Partial<User>;
export type RegisterVariables = Omit<RegisterFormInput, "passwordConfirmation">;
export const REGISTER_MUTATION = gql`
  mutation Register($username: NonEmptyString!, $email: EmailAddress!, $password: Password!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;
