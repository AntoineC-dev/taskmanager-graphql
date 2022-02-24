import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

const httpLink = new HttpLink({
  uri: "http://localhost:3001",
});
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") ?? null,
      "x-refresh-token": localStorage.getItem("refresh") ?? null,
    },
  }));
  return forward(operation);
});

const logoutLink = onError(({ response }) => {
  if (response?.extensions && response.extensions.code === "FORBIDDEN") {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    toast({
      title: "Access forbidden",
      description: "This resource requires authorization",
      status: "error",
      isClosable: true,
    });
  } else if (response?.errors) {
    response.errors.forEach((error) => {
      toast({
        description: error.message,
        status: "error",
        isClosable: true,
      });
    });
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, logoutLink.concat(httpLink)),
  credentials: "include",
});
