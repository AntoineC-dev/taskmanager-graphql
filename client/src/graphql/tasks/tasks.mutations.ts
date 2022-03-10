import { gql } from "@apollo/client";
import { SuccessMessage } from "../../models";

// CREATE_TASK_MUTATION
export type CreateTaskData = { createTask: SuccessMessage };
export const CREATE_TASK_MUTATION = gql`
  mutation ($title: NonEmptyString!, $description: NonEmptyString!) {
    createTask(title: $title, description: $description) {
      title
      description
    }
  }
`;
