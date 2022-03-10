import { MutationHookOptions, useMutation } from "@apollo/client";
import { CreateTaskData, CREATE_TASK_MUTATION } from "../../graphql";
import { CreateTaskInput } from "../../validators";

export function useCreateTaskMutation(options?: MutationHookOptions<CreateTaskData, CreateTaskInput>) {
  return useMutation<CreateTaskData, CreateTaskInput>(CREATE_TASK_MUTATION, options);
}
