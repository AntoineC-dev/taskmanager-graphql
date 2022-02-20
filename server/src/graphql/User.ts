import { extendType, objectType } from "nexus";
import { User } from "@prisma/client";
import { checkAuthenticated, comparePwd, generateUniqueIdentifier, hashPwd, sendVerificationEmail } from "../utils";

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

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateUser", {
      type: "UpdateUserPayload",
      args: {
        username: "NonEmptyString",
        email: "EmailAddress",
        password: "Password",
      },
      async resolve(_, args, ctx) {
        const { userId } = checkAuthenticated(ctx);
        const user = await ctx.prisma.user.findUnique({ where: { id: userId }, rejectOnNotFound: true });
        const { email, password, username } = args;
        // Check updates
        const usernameUpdated = username && user.username !== username;
        const emailUpdated = email && user.email !== email;
        const passwordUpdated = password && !(await comparePwd(user.password, password));
        const update = {
          username: usernameUpdated ? username : undefined,
          password: passwordUpdated ? await hashPwd(password) : undefined,
          email: emailUpdated ? email : undefined,
          verified: emailUpdated ? false : undefined,
          verificationCode: emailUpdated ? generateUniqueIdentifier() : undefined,
        };
        const updatedUser = await ctx.prisma.user.update({ where: { id: userId }, data: update });
        if (emailUpdated || passwordUpdated) {
          await ctx.prisma.session.updateMany({ where: { userId }, data: { valid: false } });
          if (emailUpdated) sendVerificationEmail(updatedUser);
          return {
            message: "Profile updated. Please login with your new credentials",
          };
        }
        return {
          user: updatedUser,
          message: "Profile updated",
        };
      },
    });
  },
});

export const UpdateUserPayload = objectType({
  name: "UpdateUserPayload",
  definition(t) {
    t.field("user", { type: "User" });
    t.nonNull.string("message");
  },
});
