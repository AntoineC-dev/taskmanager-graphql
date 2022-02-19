import { User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

export const TaskModel = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
    t.nonNull.nonEmptyString("title");
    t.string("description");
    t.nonNull.boolean("completed");
    t.nonNull.field("user", {
      type: "User",
      async resolve(parent, __, ctx) {
        const user = (await ctx.prisma.task.findUnique({ where: { id: parent.id } }).user()) as User;
        return user;
      },
    });
  },
});

export const TaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTask", {
      type: "Task",
      args: {
        title: nonNull("NonEmptyString"),
        description: stringArg(),
      },
      resolve(_, args, ctx) {
        const { title, description } = args;
        const userId = ctx.decoded?.userId;
        if (!userId) {
          throw new Error("Forbidden. You must be logged in");
        }
        return ctx.prisma.task.create({
          data: {
            title,
            description: description ?? undefined,
            userId,
          },
        });
      },
    });
  },
});
