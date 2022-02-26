import { ApolloCache, DefaultContext, gql, MutationHookOptions } from "@apollo/client";
import { AuthPayload, SuccessMessage } from "../../models";
import { RegisterFormInput } from "../../validators";

export type UseMutationOptions<T, U> = Omit<MutationHookOptions<T, U, DefaultContext, ApolloCache<any>>, "variables">;

// REGISTER_MUTATION
export type RegisterData = { register: SuccessMessage };
export type RegisterVariables = Omit<RegisterFormInput, "passwordConfirmation">;
export const REGISTER_MUTATION = gql`
  mutation Register($username: NonEmptyString!, $email: EmailAddress!, $password: Password!) {
    register(username: $username, email: $email, password: $password) {
      title
      description
    }
  }
`;

// LOGIN_MUTATION
export type LoginData = { login: AuthPayload };
export const LOGIN_MUTATION = gql`
  mutation Login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      message {
        title
        description
      }
    }
  }
`;

// LOGOUT_MUTATION
export type LogoutData = { logout: SuccessMessage };
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      title
      description
    }
  }
`;

// RESET_PASSWORD_MUTATION
export type ResetPasswordVariables = { id: string; password: string; passwordResetCode: string };
export type ResetPasswordData = { resetPassword: SuccessMessage };
export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($id: String!, $password: Password!, $passwordResetCode: String!) {
    resetPassword(id: $id, password: $password, passwordResetCode: $passwordResetCode) {
      title
      description
    }
  }
`;
