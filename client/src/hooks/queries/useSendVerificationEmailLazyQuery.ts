import { useLazyQuery } from "@apollo/client";
import {
  SendVericationEmailData,
  SendVericationEmailVariables,
  SEND_VERIFICATION_EMAIL_QUERY,
  UseQueryOptionsOmitVariables,
} from "../../graphql";

export function useSendVerificationEmailLazyQuery(
  variables: SendVericationEmailVariables,
  options?: UseQueryOptionsOmitVariables<SendVericationEmailData, SendVericationEmailVariables>
) {
  return useLazyQuery<SendVericationEmailData, SendVericationEmailVariables>(SEND_VERIFICATION_EMAIL_QUERY, {
    variables,
    ...(options && options),
  });
}
