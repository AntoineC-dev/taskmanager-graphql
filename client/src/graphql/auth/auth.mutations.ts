import { ApolloCache, DefaultContext, gql, MutationHookOptions, useMutation } from "@apollo/client";
import { User } from "../../models";
import { LoginFormInput, RegisterFormInput } from "../../validators";

type UseMutationOptions<T, U> = Omit<MutationHookOptions<T, U, DefaultContext, ApolloCache<any>>, "variables">;

// REGISTER_MUTATION

type RegisterData = Partial<User>;
type RegisterVariables = Omit<RegisterFormInput, "passwordConfirmation">;
const REGISTER_MUTATION = gql`
  mutation Register($username: NonEmptyString!, $email: EmailAddress!, $password: Password!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export function useRegisterMutation(options?: UseMutationOptions<RegisterData, RegisterVariables>) {
  return useMutation<RegisterData, RegisterVariables>(REGISTER_MUTATION, options);
}

// LOGIN_MUTATION

type LoginData = Omit<User, "tasks">;
const LOGIN_MUTATION = gql`
  mutation Login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        username
        email
      }
    }
  }
`;

export function useLoginMutation(options?: UseMutationOptions<LoginData, LoginFormInput>) {
  return useMutation<LoginData, LoginFormInput>(LOGIN_MUTATION, options);
}
