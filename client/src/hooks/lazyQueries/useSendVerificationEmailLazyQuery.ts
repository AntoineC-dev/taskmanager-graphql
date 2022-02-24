import { LazyQueryHookOptions, useLazyQuery } from "@apollo/client";
import { SendVericationEmailData, SendVericationEmailVariables, SEND_VERIFICATION_EMAIL_QUERY } from "../../graphql";

export function useSendVerificationEmailLazyQuery(
  options?: LazyQueryHookOptions<SendVericationEmailData, SendVericationEmailVariables>
) {
  return useLazyQuery<SendVericationEmailData, SendVericationEmailVariables>(SEND_VERIFICATION_EMAIL_QUERY, {
    ...(options && options),
  });
}
