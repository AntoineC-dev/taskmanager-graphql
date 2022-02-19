import { RegularExpression } from "graphql-scalars";
import { asNexusMethod } from "nexus";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/;
const GraphQLPassword = new RegularExpression("Password", passwordRegex, {
  errorMessage: (_, __) =>
    "Password must be between 8 and 26 chars. Should have at least 1 uppercase, 1 lowercase, 1 number and 1 special char",
});
export const GQLPassword = asNexusMethod(GraphQLPassword, "password");
