import { LazyQueryHookOptions, useLazyQuery } from "@apollo/client";
import { resetCodeEmailData, resetCodeEmailVariables, RESET_CODE_EMAIL_QUERY } from "../../graphql";

export function useResetCodeEmailLazyQuery(
  options?: LazyQueryHookOptions<resetCodeEmailData, resetCodeEmailVariables>
) {
  return useLazyQuery(RESET_CODE_EMAIL_QUERY, options);
}
