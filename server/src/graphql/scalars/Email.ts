import { RegularExpression } from "graphql-scalars";
import { asNexusMethod } from "nexus";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const GraphQLEmailAddress = new RegularExpression("EmailAddress", emailRegex, {
  errorMessage: (_, value) => `${value} is not a valid email`,
});
export const GQLEmail = asNexusMethod(GraphQLEmailAddress, "email");
