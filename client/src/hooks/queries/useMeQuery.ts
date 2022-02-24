import { QueryHookOptions, useQuery } from "@apollo/client";
import { MeData, ME_QUERY } from "../../graphql";

export function useMeQuery(options?: QueryHookOptions<MeData>) {
  return useQuery<MeData>(ME_QUERY, options);
}
