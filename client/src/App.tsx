import { ChakraProvider, theme } from "@chakra-ui/react";
import { Homepage } from "./pages";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Homepage />
  </ChakraProvider>
);
