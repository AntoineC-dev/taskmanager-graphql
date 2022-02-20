import { User } from "@prisma/client";
import { extendType, objectType } from "nexus";
import { checkAuthenticated } from "../utils";

export const SessionModel = objectType({
  name: "Session",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
    t.nonNull.string("userAgent");
    t.nonNull.boolean("valid");
    t.nonNull.field("user", {
      type: "User",
      async resolve(parent, args, ctx) {
        const user = (await ctx.prisma.session.findUnique({ where: { id: parent.id } }).user()) as User;
        return user;
      },
    });
  },
});

export const SessionMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("clearSessions", {
      type: "String",
      async resolve(_, __, ctx) {
        const { userId } = checkAuthenticated(ctx);
        await ctx.prisma.session.updateMany({ where: { userId }, data: { valid: false } });
        return "All sessions closed";
      },
    });
  },
});
