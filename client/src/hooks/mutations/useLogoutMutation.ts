import { MutationHookOptions, useMutation } from "@apollo/client";
import { LogoutData, LOGOUT_MUTATION } from "../../graphql";

export function useLogoutMutation(options?: MutationHookOptions<LogoutData>) {
  return useMutation<LogoutData>(LOGOUT_MUTATION, options);
}
