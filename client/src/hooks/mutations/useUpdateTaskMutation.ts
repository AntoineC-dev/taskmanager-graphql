import { MutationHookOptions, useMutation } from "@apollo/client";
import { UpdateTaskData, UpdateTaskVariables, UPDATE_TASK_MUTATION } from "../../graphql";

export function useUpdateTaskMutation(options?: MutationHookOptions<UpdateTaskData, UpdateTaskVariables>) {
  return useMutation<UpdateTaskData, UpdateTaskVariables>(UPDATE_TASK_MUTATION, options);
}
