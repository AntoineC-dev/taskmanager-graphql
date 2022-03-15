import { gql } from "@apollo/client";
import { CORE_TASK_FIELDS, Task } from "../../models";

// TASKS_QUERY
export type TasksData = { tasks: Task[] };
export const TASKS_QUERY = gql`
  ${CORE_TASK_FIELDS}
  query GetTasks {
    tasks {
      ...CoreTaskFields
    }
  }
`;
