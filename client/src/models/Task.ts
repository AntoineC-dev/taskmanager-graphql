import { gql } from "@apollo/client";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const CORE_TASK_FIELDS = gql`
  fragment CoreTaskFields on Task {
    id
    title
    completed
  }
`;
