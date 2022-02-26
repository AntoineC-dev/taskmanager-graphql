import { gql, QueryHookOptions } from "@apollo/client";

export type UseQueryOptionsOmitVariables<T, U> = Omit<QueryHookOptions<T, U>, "variables">;

// VERIFY_QUERY
export type VerifyVariables = { id: string; verificationCode: string };
export type VerifyData = { verify: string };
export const VERIFY_QUERY = gql`
  query ($id: String!, $verificationCode: String!) {
    verify(id: $id, verificationCode: $verificationCode)
  }
`;

// VERIFICATION_EMAIL_QUERY
export type VericationEmailVariables = { email: string };
export type VericationEmailData = { verificationEmail: string };
export const VERIFICATION_EMAIL_QUERY = gql`
  query ($email: String!) {
    verificationEmail(email: $email)
  }
`;

// RESET_CODE_EMAIL_QUERY
export type resetCodeEmailVariables = { email: string };
export type resetCodeEmailData = { resetCodeEmail: string };
export const RESET_CODE_EMAIL_QUERY = gql`
  query ($email: String!) {
    resetCodeEmail(email: $email)
  }
`;
