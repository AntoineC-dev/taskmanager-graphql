import { useQuery } from "@apollo/client";
import { UseQueryOptionsOmitVariables, VerifyData, VerifyVariables, VERIFY_QUERY } from "../../graphql";

export function useVerifyQuery(
  variables: VerifyVariables,
  options?: UseQueryOptionsOmitVariables<VerifyData, VerifyVariables>
) {
  return useQuery<VerifyData, VerifyVariables>(VERIFY_QUERY, {
    variables,
    ...(options && options),
  });
}
