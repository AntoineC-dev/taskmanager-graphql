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
export type SendVericationEmailData = { sendVerificationEmail: string };
export const SEND_VERIFICATION_EMAIL_QUERY = gql`
  query ($email: String!) {
    sendVerificationEmail(email: $email)
  }
`;
