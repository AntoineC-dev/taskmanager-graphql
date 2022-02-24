import { useMutation } from "@apollo/client";
import { LoginData, LOGIN_MUTATION, UseMutationOptions } from "../../graphql";
import { LoginFormInput } from "../../validators";

export function useLoginMutation(options?: UseMutationOptions<LoginData, LoginFormInput>) {
  return useMutation<LoginData, LoginFormInput>(LOGIN_MUTATION, options);
}
