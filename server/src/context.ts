import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { deserializeTokens, JWTPayload } from "./utils";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  decoded: JWTPayload | null;
  userAgent: string;
}

export const context = async ({ req, res }: { req: Request; res: Response }): Promise<Context> => {
  const userAgent = (req && req.get("user-agent")) ?? "";
  let decoded = (req && deserializeTokens(req, res)) ?? null;
  if (decoded) {
    const session = await prisma.session.findUnique({ where: { id: decoded.sessionId } });
    if (!session || !session.valid) decoded = null;
  }
  return {
    prisma,
    decoded,
    userAgent,
  };
};
