import { useMutation } from "@apollo/client";
import { ResetPasswordData, ResetPasswordVariables, RESET_PASSWORD_MUTATION, UseMutationOptions } from "../../graphql";

export function useResetPasswordMutation(options?: UseMutationOptions<ResetPasswordData, ResetPasswordVariables>) {
  return useMutation(RESET_PASSWORD_MUTATION, options);
}
