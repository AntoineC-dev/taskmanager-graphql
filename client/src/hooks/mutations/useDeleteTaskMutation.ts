import { MutationHookOptions, useMutation } from "@apollo/client";
import { DeleteTaskData, DeleteTaskVariables, DELETE_TASK_MUTATION } from "../../graphql";

export function useDeleteTaskMutation(options?: MutationHookOptions<DeleteTaskData, DeleteTaskVariables>) {
  return useMutation<DeleteTaskData, DeleteTaskVariables>(DELETE_TASK_MUTATION, options);
}
