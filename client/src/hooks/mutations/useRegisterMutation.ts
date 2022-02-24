import { useMutation } from "@apollo/client";
import { RegisterData, RegisterVariables, REGISTER_MUTATION, UseMutationOptions } from "../../graphql";

export function useRegisterMutation(options?: UseMutationOptions<RegisterData, RegisterVariables>) {
  return useMutation<RegisterData, RegisterVariables>(REGISTER_MUTATION, options);
}
