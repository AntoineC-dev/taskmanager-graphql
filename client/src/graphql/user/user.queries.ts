import { gql } from "@apollo/client";
import { User } from "../../models";

// ME_QUERY
export type MeData = { me: User };
export const ME_QUERY = gql`
  query {
    me {
      id
      username
      email
      tasks {
        id
        title
        description
        completed
      }
    }
  }
`;
