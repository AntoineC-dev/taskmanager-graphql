import { LazyQueryHookOptions, useLazyQuery } from "@apollo/client";
import { VericationEmailData, VericationEmailVariables, VERIFICATION_EMAIL_QUERY } from "../../graphql";

export function useVerificationEmailLazyQuery(
  options?: LazyQueryHookOptions<VericationEmailData, VericationEmailVariables>
) {
  return useLazyQuery<VericationEmailData, VericationEmailVariables>(VERIFICATION_EMAIL_QUERY, options);
}
