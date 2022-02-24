import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { client } from "./graphql";
import { Router } from "./navigation";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </ChakraProvider>
);
