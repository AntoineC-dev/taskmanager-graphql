import { ApolloLink, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast({
  defaultOptions: { status: "error", isClosable: true },
});

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
  return forward(operation).map((data) => {
    const context = operation.getContext();
    const newAccessToken = context.response.headers.get("x-access-token");
    console.log("newAccessToken:", newAccessToken);
    if (newAccessToken) localStorage.setItem("token", newAccessToken);
    return data;
  });
});

const logoutLink = onError(({ graphQLErrors, networkError }) => {
  graphQLErrors?.forEach(({ extensions, message }) => {
    if (extensions.code === "FORBIDDEN") {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      toast({ title: "Access forbidden", description: message });
    } else {
      toast({ description: message });
    }
    if (networkError) {
      toast({ title: "Network error", description: "Try again later or contact the support" });
    }
  });
});

export default from([authMiddleware, logoutLink.concat(httpLink)]);
