import { gql, QueryHookOptions, useQuery } from "@apollo/client";

// VERIFY_QUERY

export type VerifyVariables = { id: string; verificationCode: string };
const VERIFY_QUERY = gql`
  query ($id: String!, $verificationCode: String!) {
    verify(id: $id, verificationCode: $verificationCode)
  }
`;

type VerifyData = { verify: string };
type UseVerifyQueryOptions = Omit<QueryHookOptions<VerifyData, VerifyVariables>, "variables">;
export function useVerifyQuery(variables: VerifyVariables, options?: UseVerifyQueryOptions) {
  return useQuery<VerifyData, VerifyVariables>(VERIFY_QUERY, {
    variables,
    ...(options && options),
  });
}
