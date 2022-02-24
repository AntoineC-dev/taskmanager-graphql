import { gql } from "@apollo/client";
import { User } from "../../models";

// ME_QUERY
export type MeData = { me: Pick<User, "id" | "email" | "username"> };
export const ME_QUERY = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;
