import { extendType, nonNull, objectType, stringArg } from "nexus";
import { resolve } from "path/posix";
import {
  checkAuthenticated,
  checkDuplicateEmail,
  checkLoginCredentials,
  checkNotAuthenticated,
  checkUserVerified,
  checkVerificationCode,
  hashPwd,
  sendPasswordResetCodeEmail,
  sendVerificationEmail,
  signTokens,
} from "../utils";

export const AuthPayloadModel = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("accessToken");
    t.nonNull.string("refreshToken");
    t.nonNull.field("user", {
      type: "User",
    });
  },
});

export const AuthQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("sendVerificationEmail", {
      type: "String",
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const message = "We have sent you a verification email";
        const user = await ctx.prisma.user.findUnique({ where: { email: args.email } });
        if (!user || user.verified) return message;
        sendVerificationEmail(user);
        return message;
      },
    });
    t.nonNull.field("sendPasswordResetCode", {
      type: "String",
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const message = "We have sent you a password reset code";
        const user = await ctx.prisma.user.findUnique({ where: { email: args.email } });
        if (!user) return message;
        checkUserVerified(user);
        sendPasswordResetCodeEmail(user);
        return message;
      },
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("register", {
      type: "User",
      args: {
        username: nonNull("NonEmptyString"),
        email: nonNull("EmailAddress"),
        password: nonNull("Password"),
      },
      async resolve(_, args, ctx) {
        const { email, password, username } = args;
        await checkDuplicateEmail(ctx, email);
        const hash = await hashPwd(password);
        const user = await ctx.prisma.user.create({
          data: {
            email,
            username,
            password: hash,
          },
        });
        sendVerificationEmail(user);
        return user;
      },
    });
    t.nonNull.field("verify", {
      type: "String",
      args: {
        id: nonNull(stringArg()),
        verificationCode: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx) {
        await checkVerificationCode(ctx, args);
        await ctx.prisma.user.update({ where: { id: args.id }, data: { verified: true } });
        return "Account successfully verified";
      },
    });
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        email: nonNull("EmailAddress"),
        password: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        checkNotAuthenticated(ctx);
        const user = await checkLoginCredentials(ctx, args);
        checkUserVerified(user);
        const session = await ctx.prisma.session.create({
          data: {
            userAgent: ctx.userAgent ?? "",
            userId: user.id,
          },
        });
        const { accessToken, refreshToken } = signTokens({ userId: user.id, sessionId: session.id });
        return { accessToken, refreshToken, user };
      },
    });
    t.nonNull.field("logout", {
      type: "String",
      async resolve(_, __, ctx) {
        const { sessionId } = checkAuthenticated(ctx);
        await ctx.prisma.session.update({ where: { id: sessionId }, data: { valid: false } });
        return "Successfully logged out";
      },
    });
  },
});
