type AuthTokens = "token" | "refresh";

export function getToken(name: AuthTokens) {
  return localStorage.getItem(name);
}

export function setToken(name: AuthTokens, token: string) {
  return localStorage.setItem(name, token);
}

export function removeToken(name: AuthTokens) {
  return localStorage.removeItem(name);
}
