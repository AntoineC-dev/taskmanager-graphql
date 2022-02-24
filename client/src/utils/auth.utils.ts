import { isAuthenticatedRV } from "../graphql";
import { AuthPayload } from "../models";
import { removeToken, setToken } from "./storage.utils";

export function login({ accessToken, refreshToken }: Pick<AuthPayload, "accessToken" | "refreshToken">) {
  setToken("token", accessToken);
  setToken("refresh", refreshToken);
  isAuthenticatedRV(true);
}

export function logout() {
  removeToken("token");
  removeToken("refresh");
  isAuthenticatedRV(false);
}
