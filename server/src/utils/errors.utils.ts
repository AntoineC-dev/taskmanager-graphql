import { Context } from "../context";
import { comparePwd } from "./pwd.utils";
import { User } from "@prisma/client";

export function checkAuthenticated(ctx: Context) {
  if (!ctx.decoded) {
    throw new Error("Forbidden! This request requires authentication");
  }
  return ctx.decoded;
}

export async function checkDuplicateEmail(ctx: Context, email: string) {
  const duplicateEmail = await ctx.prisma.user.findUnique({ where: { email } });
  if (duplicateEmail) {
    throw new Error("Email address already in use");
  }
}

export async function checkLoginCredentials(ctx: Context, { email, password }: { email: string; password: string }) {
  const errorMessage = "Invalid email or password";
  const user = await ctx.prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error(errorMessage);
  }
  const valid = await comparePwd(user.password, password);
  if (!valid) {
    throw new Error(errorMessage);
  }
  return user;
}

export function checkNotAuthenticated(ctx: Context) {
  if (ctx.decoded) {
    throw new Error("Already logged in");
  }
}

export function checkUserVerified(user: User) {
  if (!user.verified) {
    throw new Error("Please verify your email");
  }
}

export async function checkVerificationCode(
  ctx: Context,
  { id, verificationCode }: { id: string; verificationCode: string }
) {
  const user = await ctx.prisma.user.findUnique({ where: { id } });
  if (!user || user.verified || user.verificationCode !== verificationCode) {
    throw new Error("Could not verify your account");
  }
}
