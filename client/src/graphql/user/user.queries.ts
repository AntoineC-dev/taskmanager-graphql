import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { User } from "../../models";

// ME_QUERY

const ME_QUERY = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;

type MeData = { me: Pick<User, "id" | "email" | "username"> };
export function useMeQuery(options?: QueryHookOptions<MeData>) {
  return useQuery<MeData>(ME_QUERY, options);
}
