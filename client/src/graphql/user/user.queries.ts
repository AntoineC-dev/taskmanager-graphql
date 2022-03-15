import { gql } from "@apollo/client";
import { User } from "../../models";

// ME_QUERY
export type MeData = { me: Omit<User, "tasks"> };
export const ME_QUERY = gql`
  query GetUser {
    me {
      id
      username
      email
    }
  }
`;
