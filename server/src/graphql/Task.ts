import { User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import { checkAuthenticated, truncateString } from "../utils";

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
      type: "SuccessMessage",
      args: {
        title: nonNull("NonEmptyString"),
        description: nonNull("NonEmptyString"),
      },
      async resolve(_, args, ctx) {
        const { userId } = checkAuthenticated(ctx);
        const task = await ctx.prisma.task.create({
          data: {
            ...args,
            userId,
          },
        });
        return {
          title: "New task created",
          description: `${truncateString(task.title, 15)} was added to your list`,
        };
      },
    });
    t.nonNull.field("updateTask", {
      type: "Task",
      args: {
        id: nonNull(stringArg()),
        title: "NonEmptyString",
        description: "NonEmptyString",
      },
      async resolve(_, args, ctx) {
        checkAuthenticated(ctx);
        const { id, description, title } = args;
        const task = await ctx.prisma.task.findUnique({ where: { id }, rejectOnNotFound: true });
        const updatedTitle = title && title !== task.title;
        const updatedDesc = description && description !== task.description;
        return ctx.prisma.task.update({
          where: { id },
          data: {
            title: updatedTitle ? title : undefined,
            description: updatedDesc ? description : undefined,
          },
        });
      },
    });
    t.nonNull.field("deleteTask", {
      type: "SuccessMessage",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        checkAuthenticated(ctx);
        const task = await ctx.prisma.task.delete({ where: { id: args.id } });
        return {
          title: "Task deleted",
          description: `${truncateString(task.title, 15)} was removed from your list`,
        };
      },
    });
    t.nonNull.field("deleteAllTasks", {
      type: "SuccessMessage",
      async resolve(_, __, ctx) {
        const { userId } = checkAuthenticated(ctx);
        await ctx.prisma.task.deleteMany({ where: { userId } });
        return {
          title: "Success",
          description: "We deleted all your tasks",
        };
      },
    });
  },
});
