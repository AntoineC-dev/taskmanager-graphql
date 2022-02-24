import { ApolloClient, InMemoryCache } from "@apollo/client";
import link from "./middlewares";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  credentials: "include",
});
