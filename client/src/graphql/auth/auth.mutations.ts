import { ApolloCache, DefaultContext, gql, MutationHookOptions } from "@apollo/client";
import { AuthPayload } from "../../models";
import { RegisterFormInput } from "../../validators";

export type UseMutationOptions<T, U> = Omit<MutationHookOptions<T, U, DefaultContext, ApolloCache<any>>, "variables">;

// REGISTER_MUTATION
export type RegisterData = { register: string };
export type RegisterVariables = Omit<RegisterFormInput, "passwordConfirmation">;
export const REGISTER_MUTATION = gql`
  mutation Register($username: NonEmptyString!, $email: EmailAddress!, $password: Password!) {
    register(username: $username, email: $email, password: $password)
  }
`;

// LOGIN_MUTATION
export type LoginData = { login: AuthPayload };
export const LOGIN_MUTATION = gql`
  mutation Login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      message
    }
  }
`;
