import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "http://localhost:3001",
  credentials: "include",
});
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || null,
    },
  }));
  return forward(operation);
});

const logoutLink = onError(({ response }) => {
  if (response?.extensions && response.extensions.code === "FORBIDDEN" && localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, logoutLink.concat(httpLink)),
});
