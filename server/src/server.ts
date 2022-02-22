import { ApolloServer } from "apollo-server";
import config from "config";
import { context } from "./context";
import { schema } from "./schema";
import { logger, verifySMTP } from "./utils";

export const server = new ApolloServer({
  schema,
  context,
  cors: {
    origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["x-access-token"],
  },
});

const port = config.get<string>("port");

server.listen({ port }).then(({ url }) => {
  logger.info(`Server listening at ${url}`);
  verifySMTP();
});
