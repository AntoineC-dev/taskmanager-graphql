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

// SEND_VERIFICATION_EMAIL_QUERY
export type SendVericationEmailVariables = { email: string };
export type SendVericationEmailData = { sendVerificationEmail: string };
export const SEND_VERIFICATION_EMAIL_QUERY = gql`
  query ($email: String!) {
    sendVerificationEmail(email: $email)
  }
`;

// SEND_PASSWORD_RESET_CODE_EMAIL_QUERY
export type SendPasswordResetCodeEmailVariables = { email: string };
export type SendPasswordResetCodeEmailData = { sendPasswordResetCodeEmail: string };
export const SEND_PASSWORD_RESET_CODE_EMAIL_QUERY = gql`
  query ($email: String!) {
    sendPasswordResetCodeEmail(email: $email)
  }
`;
