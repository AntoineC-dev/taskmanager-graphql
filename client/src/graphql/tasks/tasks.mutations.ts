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

// TOGGLE_TASK_MUTATION
export type ToggleTaskData = { toggleTask: SuccessMessage };
export type ToggleTaskVariables = { id: string };
export const TOGGLE_TASK_MUTATION = gql`
  mutation ($id: String!) {
    toggleTask(id: $id) {
      title
      description
    }
  }
`;

// DELETE_TASK_MUTATION
export type DeleteTaskData = { deleteTask: SuccessMessage };
export type DeleteTaskVariables = { id: string };
export const DELETE_TASK_MUTATION = gql`
  mutation ($id: String!) {
    deleteTask(id: $id) {
      title
      description
    }
  }
`;
