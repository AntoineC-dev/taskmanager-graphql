import { makeVar } from "@apollo/client";

export const isAuthenticatedRV = makeVar(!!localStorage.getItem("token"));
