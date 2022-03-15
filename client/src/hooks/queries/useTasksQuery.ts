import { QueryHookOptions, useQuery } from "@apollo/client";
import { TasksData, TASKS_QUERY } from "../../graphql";

export function useTasksQuery(options?: QueryHookOptions<TasksData>) {
  return useQuery<TasksData>(TASKS_QUERY, options);
}
