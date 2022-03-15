import { QueryHookOptions, useQuery } from "@apollo/client";
import { TasksData, TasksVariables, TASKS_QUERY } from "../../graphql";

export function useTasksQuery(options?: QueryHookOptions<TasksData, TasksVariables>) {
  return useQuery<TasksData, TasksVariables>(TASKS_QUERY, options);
}
