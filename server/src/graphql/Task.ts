import { User } from "@prisma/client";
import { booleanArg, extendType, nonNull, objectType, stringArg } from "nexus";
import { checkAuthenticated, truncateString } from "../utils";

export const TaskModel = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
    t.nonNull.nonEmptyString("title");
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

export const TaskQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("tasks", {
      type: "Task",
      args: {
        filter: stringArg(),
        completed: booleanArg(),
      },
      resolve(_, { completed, filter }, ctx) {
        const { userId } = checkAuthenticated(ctx);
        return ctx.prisma.task.findMany({
          where: {
            userId,
            completed: completed as boolean | undefined,
            title: { contains: filter as string | undefined },
          },
        });
      },
    });
  },
});

export const TaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTask", {
      type: "Task",
      args: { title: nonNull("NonEmptyString") },
      resolve(_, { title }, ctx) {
        const { userId } = checkAuthenticated(ctx);
        return ctx.prisma.task.create({ data: { title, userId } });
      },
    });
    t.nonNull.field("updateTask", {
      type: "Task",
      args: {
        id: nonNull(stringArg()),
        title: nonNull("NonEmptyString"),
      },
      resolve(_, args, ctx) {
        checkAuthenticated(ctx);
        const { id, title } = args;
        return ctx.prisma.task.update({ where: { id }, data: { title } });
      },
    });
    t.nonNull.field("toggleTask", {
      type: "Task",
      args: { id: nonNull(stringArg()) },
      async resolve(_, { id }, ctx) {
        const task = await ctx.prisma.task.findUnique({ where: { id }, rejectOnNotFound: true });
        return ctx.prisma.task.update({ where: { id }, data: { completed: !task.completed } });
      },
    });
    t.nonNull.field("deleteTask", {
      type: "Task",
      args: { id: nonNull(stringArg()) },
      resolve(_, args, ctx) {
        checkAuthenticated(ctx);
        return ctx.prisma.task.delete({ where: { id: args.id } });
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
