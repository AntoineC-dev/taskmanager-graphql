import { ApolloServer } from "apollo-server";
import config from "config";
import { context } from "./context";
import { schema } from "./schema";
import { logger } from "./utils";

export const server = new ApolloServer({
  schema,
  context,
});

const port = config.get<string>("port");

server.listen({ port }).then(({ url }) => {
  logger.info(`Server listening at ${url}`);
});
