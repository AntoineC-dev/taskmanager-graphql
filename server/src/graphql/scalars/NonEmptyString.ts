import { GraphQLNonEmptyString } from "graphql-scalars";
import { asNexusMethod } from "nexus";

export const GQLNonEmptyString = asNexusMethod(GraphQLNonEmptyString, "nonEmptyString");
