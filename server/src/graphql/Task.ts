import { User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import { checkAuthenticated } from "../utils";

export const TaskModel = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
    t.nonNull.nonEmptyString("title");
    t.nonNull.nonEmptyString("description");
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
        description: nonNull("NonEmptyString"),
      },
      resolve(_, args, ctx) {
        const { userId } = checkAuthenticated(ctx);
        return ctx.prisma.task.create({
          data: {
            ...args,
            userId,
          },
        });
      },
    });
    t.nonNull.field("updateTask", {
      type: "Task",
      args: {
        id: nonNull(stringArg()),
        title: stringArg(),
        description: stringArg(),
      },
      resolve(_, args, ctx) {
        checkAuthenticated(ctx);
        const { id, description, title } = args;
        return ctx.prisma.task.update({
          where: { id },
          data: {
            title: title ?? undefined,
            description: description ?? undefined,
          },
        });
      },
    });
    t.nonNull.field("deleteTask", {
      type: "Task",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        checkAuthenticated(ctx);
        return ctx.prisma.task.delete({ where: { id: args.id } });
      },
    });
    t.nonNull.field("deleteAllTasks", {
      type: "String",
      async resolve(_, __, ctx) {
        const { userId } = checkAuthenticated(ctx);
        await ctx.prisma.task.deleteMany({ where: { userId } });
        return "All tasks deleted";
      },
    });
  },
});
