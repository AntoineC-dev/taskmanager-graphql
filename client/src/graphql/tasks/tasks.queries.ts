import { gql } from "@apollo/client";
import { CORE_TASK_FIELDS, Task } from "../../models";

// TASKS_QUERY
export type TasksData = { tasks: Task[] };
export type TasksVariables = { filter: string; completed: boolean };
export const TASKS_QUERY = gql`
  ${CORE_TASK_FIELDS}
  query GetTasks($filter: String, $completed: Boolean) {
    tasks(filter: $filter, completed: $completed) {
      ...CoreTaskFields
    }
  }
`;
