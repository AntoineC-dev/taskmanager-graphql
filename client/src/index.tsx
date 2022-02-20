import { ApolloProvider } from "@apollo/client";
import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { client } from "./graphql";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
