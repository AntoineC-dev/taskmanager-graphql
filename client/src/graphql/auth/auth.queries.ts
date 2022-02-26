import { gql, QueryHookOptions } from "@apollo/client";
import { SuccessMessage } from "../../models";

export type UseQueryOptionsOmitVariables<T, U> = Omit<QueryHookOptions<T, U>, "variables">;

// VERIFY_QUERY
export type VerifyVariables = { id: string; verificationCode: string };
export type VerifyData = { verify: SuccessMessage };
export const VERIFY_QUERY = gql`
  query ($id: String!, $verificationCode: String!) {
    verify(id: $id, verificationCode: $verificationCode) {
      title
      description
    }
  }
`;

// VERIFICATION_EMAIL_QUERY
export type VericationEmailVariables = { email: string };
export type VericationEmailData = { verificationEmail: SuccessMessage };
export const VERIFICATION_EMAIL_QUERY = gql`
  query ($email: String!) {
    verificationEmail(email: $email) {
      title
      description
    }
  }
`;

// RESET_CODE_EMAIL_QUERY
export type resetCodeEmailVariables = { email: string };
export type resetCodeEmailData = { resetCodeEmail: SuccessMessage };
export const RESET_CODE_EMAIL_QUERY = gql`
  query ($email: String!) {
    resetCodeEmail(email: $email) {
      title
      description
    }
  }
`;
