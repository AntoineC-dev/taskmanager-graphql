import { ApolloLink, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createStandaloneToast } from "@chakra-ui/react";
import { getToken, logout, setToken } from "../utils";
import { isAuthenticatedRV } from "./variables";

const toast = createStandaloneToast();

const httpLink = new HttpLink({
  uri: "http://localhost:3001",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: getToken("token") ?? null,
      "x-refresh-token": getToken("refresh") ?? null,
    },
  }));
  return forward(operation).map((data) => {
    const context = operation.getContext();
    const newAccessToken = context.response.headers.get("Authorization");
    if (newAccessToken) setToken("token", newAccessToken);
    return data;
  });
});

const logoutLink = onError(({ graphQLErrors, networkError }) => {
  graphQLErrors?.forEach(({ extensions, message }) => {
    if (extensions.code === "FORBIDDEN") {
      if (isAuthenticatedRV()) logout();
      toast({ title: "Access forbidden", description: message, status: "error", isClosable: true });
    } else {
      toast({ description: message, status: "error", isClosable: true });
    }
    if (networkError) {
      toast({
        title: "Network error",
        description: "Try again later or contact the support",
        status: "error",
        isClosable: true,
      });
    }
  });
});

export default from([authMiddleware, logoutLink.concat(httpLink)]);
