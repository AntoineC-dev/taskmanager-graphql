import { extendType, nonNull, objectType, stringArg } from "nexus";
import { comparePwd, hashPwd, sendVerificationEmail, signTokens } from "../utils";

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
    t.nonNull.field("verify", {
      type: "Boolean",
      args: {
        id: nonNull(stringArg()),
        verificationCode: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx) {
        const { id, verificationCode } = args;
        const errorMessage = "Could not verify your account";
        const user = await ctx.prisma.user.findUnique({ where: { id } });
        if (!user || user.verificationCode !== verificationCode) {
          throw new Error(errorMessage);
        }
        return true;
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
        const duplicateEmail = await ctx.prisma.user.findUnique({ where: { email } });
        if (duplicateEmail) {
          throw new Error("Email address already in use");
        }
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
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        email: nonNull("EmailAddress"),
        password: nonNull("Password"),
      },
      async resolve(_, args, ctx) {
        const { email, password } = args;
        if (ctx.decoded) {
          throw new Error("User already logged in");
        }
        const errorMessage = "Invalid email or password";
        const user = await ctx.prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error(errorMessage);
        }
        if (!user.verified) {
          throw new Error("Please verify your email");
        }
        const valid = await comparePwd(user.password, password);
        if (!valid) {
          throw new Error(errorMessage);
        }
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
  },
});
