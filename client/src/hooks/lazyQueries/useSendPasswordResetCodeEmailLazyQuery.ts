import { LazyQueryHookOptions, useLazyQuery } from "@apollo/client";
import {
  SendPasswordResetCodeEmailData,
  SendPasswordResetCodeEmailVariables,
  SEND_PASSWORD_RESET_CODE_EMAIL_QUERY,
} from "../../graphql";

export function useSendPasswordResetCodeEmailLazyQuery(
  options?: LazyQueryHookOptions<SendPasswordResetCodeEmailData, SendPasswordResetCodeEmailVariables>
) {
  return useLazyQuery(SEND_PASSWORD_RESET_CODE_EMAIL_QUERY, {
    ...(options && options),
  });
}
