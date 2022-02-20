import { extendType, objectType } from "nexus";
import { User } from "@prisma/client";

export const UserModel = objectType({
  name: "User",
  definition(t) {
    t.nonNull.nonEmptyString("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
    t.nonNull.nonEmptyString("username");
    t.nonNull.email("email");
    t.nonNull.list.nonNull.field("tasks", {
      type: "Task",
      resolve(parent, __, ctx) {
        return ctx.prisma.user.findUnique({ where: { id: parent.id } }).tasks();
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("me", {
      type: "User",
      async resolve(_, __, ctx) {
        if (!ctx.decoded) {
          throw new Error("Forbidden. You must be logged in");
        }
        const user = (await ctx.prisma.user.findUnique({ where: { id: ctx.decoded.userId } })) as User;
        return user;
      },
    });
  },
});
