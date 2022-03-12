import { gql } from "@apollo/client";
import { SuccessMessage } from "../../models";

// CREATE_TASK_MUTATION
export type CreateTaskData = { createTask: SuccessMessage };
export const CREATE_TASK_MUTATION = gql`
  mutation ($title: NonEmptyString!) {
    createTask(title: $title) {
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

// UPDATE_TASK_MUTATION
export type UpdateTaskData = { updateTask: SuccessMessage };
export type UpdateTaskVariables = { id: string; title: string };
export const UPDATE_TASK_MUTATION = gql`
  mutation ($id: String!, $title: NonEmptyString!) {
    updateTask(id: $id, title: $title) {
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
