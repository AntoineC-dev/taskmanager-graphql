import { useReactiveVar } from "@apollo/client";
import { isAuthenticatedRV } from "../graphql";

export function useIsAuthenticated() {
  return useReactiveVar(isAuthenticatedRV);
}
