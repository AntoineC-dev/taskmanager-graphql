import { MutationHookOptions, useMutation } from "@apollo/client";
import { DeleteTaskData, DeleteTaskVariables, DELETE_TASK_MUTATION } from "../../graphql";
import { CORE_TASK_FIELDS } from "../../models";

export function useDeleteTaskMutation(options?: MutationHookOptions<DeleteTaskData, DeleteTaskVariables>) {
  return useMutation<DeleteTaskData, DeleteTaskVariables>(DELETE_TASK_MUTATION, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            const delTaskRef = cache.writeFragment({
              data: data?.deleteTask,
              fragment: CORE_TASK_FIELDS,
            });
            return existingTasks.filter((task: any) => task.__ref !== delTaskRef?.__ref);
          },
        },
      });
    },
    ...(options && options),
  });
}
