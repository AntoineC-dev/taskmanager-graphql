import { MutationHookOptions, useMutation } from "@apollo/client";
import { CreateTaskData, CREATE_TASK_MUTATION } from "../../graphql";
import { CORE_TASK_FIELDS } from "../../models";
import { CreateTaskInput } from "../../validators";

export function useCreateTaskMutation(options?: Omit<MutationHookOptions<CreateTaskData, CreateTaskInput>, "update">) {
  return useMutation<CreateTaskData, CreateTaskInput>(CREATE_TASK_MUTATION, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            const newTaskRef = cache.writeFragment({
              data: data?.createTask,
              fragment: CORE_TASK_FIELDS,
            });
            return [...existingTasks, newTaskRef];
          },
        },
      });
    },
    ...(options && options),
  });
}
