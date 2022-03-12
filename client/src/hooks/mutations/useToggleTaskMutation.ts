import { MutationHookOptions, useMutation } from "@apollo/client";
import { ToggleTaskData, ToggleTaskVariables, TOGGLE_TASK_MUTATION } from "../../graphql";

export function useToggleTaskMutation(options?: MutationHookOptions<ToggleTaskData, ToggleTaskVariables>) {
  return useMutation<ToggleTaskData, ToggleTaskVariables>(TOGGLE_TASK_MUTATION, options);
}
