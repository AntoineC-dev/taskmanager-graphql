import { extendType, nonNull, objectType, stringArg } from "nexus";
import {
  checkAuthenticated,
  checkDuplicateEmail,
  checkLoginCredentials,
  checkNotAuthenticated,
  checkNotVerified,
  checkPasswordResetCode,
  checkUserVerified,
  checkVerificationCode,
  generateUniqueIdentifier,
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
    t.nonNull.string("message");
  },
});

export const AuthQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("verificationEmail", {
      type: "String",
      args: { email: nonNull(stringArg()) },
      async resolve(_, args, ctx) {
        const message = "We have sent you a verification email";
        const user = await ctx.prisma.user.findUnique({ where: { email: args.email } });
        if (!user) return message;
        checkNotVerified(user);
        sendVerificationEmail(user);
        return message;
      },
    });
    t.nonNull.field("resetCodeEmail", {
      type: "String",
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const message = "We have sent you a password reset code";
        const user = await ctx.prisma.user.findUnique({ where: { email: args.email } });
        if (!user) return message;
        checkUserVerified(user);
        const passwordResetCode = generateUniqueIdentifier();
        const updatedUser = await ctx.prisma.user.update({ where: { email: args.email }, data: { passwordResetCode } });
        sendPasswordResetCodeEmail(updatedUser);
        return message;
      },
    });
    t.nonNull.field("verify", {
      type: "String",
      args: {
        id: nonNull(stringArg()),
        verificationCode: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        await checkVerificationCode(ctx, args);
        await ctx.prisma.user.update({ where: { id: args.id }, data: { verified: true } });
        return "You can now login to your account";
      },
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("register", {
      type: "String",
      args: {
        username: nonNull("NonEmptyString"),
        email: nonNull("EmailAddress"),
        password: nonNull("Password"),
      },
      async resolve(_, args, ctx) {
        const { email, password, username } = args;
        const message = "We have sent you a verification email";
        await checkDuplicateEmail(ctx, email);
        const hash = await hashPwd(password);
        const user = await ctx.prisma.user.create({ data: { email, username, password: hash } });
        sendVerificationEmail(user);
        return message;
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
        const message = `Hi ${user.username}, how are you today?`;
        checkUserVerified(user);
        const session = await ctx.prisma.session.create({
          data: { userAgent: ctx.userAgent, userId: user.id },
        });
        const { accessToken, refreshToken } = signTokens({ userId: user.id, sessionId: session.id });
        return { accessToken, refreshToken, message };
      },
    });
    t.nonNull.field("logout", {
      type: "String",
      async resolve(_, __, ctx) {
        const { sessionId } = checkAuthenticated(ctx);
        await ctx.prisma.session.update({ where: { id: sessionId }, data: { valid: false } });
        return "We already miss you. See you soon!";
      },
    });
    t.nonNull.field("resetPassword", {
      type: "String",
      args: {
        id: nonNull(stringArg()),
        password: nonNull("Password"),
        passwordResetCode: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const { id, password, passwordResetCode } = args;
        await checkPasswordResetCode(ctx, { id, passwordResetCode });
        const hash = await hashPwd(password);
        await ctx.prisma.user.update({
          where: { id },
          data: {
            password: hash,
            passwordResetCode: null,
            sessions: { updateMany: { where: { valid: true }, data: { valid: false } } },
          },
        });
        return "We logged you out from all active sessions";
      },
    });
    t.nonNull.field("logoutEverywhere", {
      type: "String",
      async resolve(_, __, ctx) {
        const { userId } = checkAuthenticated(ctx);
        await ctx.prisma.session.updateMany({ where: { userId, valid: true }, data: { valid: false } });
        return "We logged you out from all active sessions";
      },
    });
  },
});
