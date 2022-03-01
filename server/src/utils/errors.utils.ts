import { Context } from "../context";
import { comparePwd } from "./pwd.utils";
import { User } from "@prisma/client";
import { AuthenticationError, ForbiddenError, UserInputError } from "apollo-server";

export function checkAuthenticated(ctx: Context) {
  if (!ctx.decoded) {
    throw new ForbiddenError("This resource requires authorization");
  }
  return ctx.decoded;
}

export async function checkDuplicateEmail(ctx: Context, email: string) {
  const duplicateEmail = await ctx.prisma.user.findUnique({ where: { email } });
  if (duplicateEmail) {
    throw new AuthenticationError("Email address already in use");
  }
}

export async function checkLoginCredentials(ctx: Context, { email, password }: { email: string; password: string }) {
  const errorMessage = "Invalid email or password";
  const user = await ctx.prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new UserInputError(errorMessage);
  }
  const valid = await comparePwd(user.password, password);
  if (!valid) {
    throw new UserInputError(errorMessage);
  }
  return user;
}

export function checkNotAuthenticated(ctx: Context) {
  if (ctx.decoded) {
    throw new AuthenticationError("You are already authenticated");
  }
}

export async function checkPasswordResetCode(
  ctx: Context,
  { id, passwordResetCode }: { id: string; passwordResetCode: string }
) {
  const user = await ctx.prisma.user.findUnique({ where: { id } });
  if (!user || !user.verified || user.passwordResetCode !== passwordResetCode) {
    throw new UserInputError("We could not reset your password");
  }
  return user;
}

export async function checkPasswordDifferent({ user, password }: { user: User; password: string }) {
  const isValid = await comparePwd(user.password, password);
  if (isValid) {
    throw new UserInputError("Should be different from your current password");
  }
}

export function checkUserVerified(user: User) {
  if (!user.verified) {
    throw new AuthenticationError("Your email is not verified");
  }
}

export function checkNotVerified(user: User) {
  if (user.verified) {
    throw new AuthenticationError("Your email is already verified");
  }
}

export async function checkVerificationCode(
  ctx: Context,
  { id, verificationCode }: { id: string; verificationCode: string }
) {
  const user = await ctx.prisma.user.findUnique({ where: { id } });
  if (!user || user.verified || user.verificationCode !== verificationCode) {
    throw new UserInputError("We could not verify your account");
  }
}
