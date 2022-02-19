import { User } from "@prisma/client";
import { objectType } from "nexus";

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
