import { gql, QueryHookOptions, useQuery } from "@apollo/client";

type UseQueryOptionsOmitVariables<T, U> = Omit<QueryHookOptions<T, U>, "variables">;

// VERIFY_QUERY

export type VerifyVariables = { id: string; verificationCode: string };
const VERIFY_QUERY = gql`
  query ($id: String!, $verificationCode: String!) {
    verify(id: $id, verificationCode: $verificationCode)
  }
`;

type VerifyData = { verify: string };
export function useVerifyQuery(
  variables: VerifyVariables,
  options?: UseQueryOptionsOmitVariables<VerifyData, VerifyVariables>
) {
  return useQuery<VerifyData, VerifyVariables>(VERIFY_QUERY, {
    variables,
    ...(options && options),
  });
}
