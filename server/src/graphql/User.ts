import { extendType, nonNull, objectType } from "nexus";
import { checkAuthenticated, generateUniqueIdentifier, hashPwd, sendVerificationEmail } from "../utils";

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
      resolve(_, __, ctx) {
        const { userId } = checkAuthenticated(ctx);
        return ctx.prisma.user.findUnique({ where: { id: userId }, rejectOnNotFound: true });
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateUsername", {
      type: "User",
      args: { username: nonNull("NonEmptyString") },
      resolve(_, { username }, ctx) {
        const { userId } = checkAuthenticated(ctx);
        return ctx.prisma.user.update({ where: { id: userId }, data: { username } });
      },
    });
    t.nonNull.field("updateEmail", {
      type: "String",
      args: { email: nonNull("EmailAddress") },
      async resolve(_, { email }, ctx) {
        const { userId } = checkAuthenticated(ctx);
        const verificationCode = generateUniqueIdentifier();
        const updatedUser = await ctx.prisma.user.update({
          where: { id: userId },
          data: {
            email,
            verificationCode,
            sessions: { updateMany: { where: { valid: true }, data: { valid: false } } },
          },
        });
        sendVerificationEmail(updatedUser);
        return "We have sent you a verification email";
      },
    });
    t.nonNull.field("updatePassword", {
      type: "String",
      args: { password: nonNull("Password") },
      async resolve(_, args, ctx) {
        const { userId } = checkAuthenticated(ctx);
        const password = await hashPwd(args.password);
        await ctx.prisma.user.update({
          where: { id: userId },
          data: { password, sessions: { updateMany: { where: { valid: true }, data: { valid: false } } } },
        });
        return "We logged you out from all active sessions";
      },
    });
  },
});
