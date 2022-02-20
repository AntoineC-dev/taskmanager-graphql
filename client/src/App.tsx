import { ChakraProvider, theme } from "@chakra-ui/react";
import { Router } from "./navigation";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
);
