import { gql, QueryHookOptions, useQuery } from "@apollo/client";

// VERIFY_QUERY

export type VerifyVariables = { id: string; verificationCode: string };
const VERIFY_QUERY = gql`
  query ($verifyId: String!, $verificationCode: String!) {
    verify(id: $verifyId, verificationCode: $verificationCode)
  }
`;

type UseVerifyQueryOptions = Omit<QueryHookOptions<string, VerifyVariables>, "variables">;
export function useVerifyQuery(variables: VerifyVariables, options?: UseVerifyQueryOptions) {
  return useQuery<string, VerifyVariables>(VERIFY_QUERY, {
    variables,
    ...(options && options),
  });
}
