import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import config from "config";

const accessTokenTtl = config.get<string>("accessTokenTtl");
const refreshTokenTtl = config.get<string>("refreshTokenTtl");
const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export interface JWTPayload {
  userId: string;
  sessionId: string;
}

function signJwt(payload: JWTPayload, type: "accessToken" | "refreshToken") {
  return jwt.sign(payload, privateKey, {
    expiresIn: type === "accessToken" ? accessTokenTtl : refreshTokenTtl,
    algorithm: "RS256",
  });
}

function verifyJwt(token: string) {
  try {
    const decodedToken = jwt.verify(token, publicKey) as JWTPayload;
    return decodedToken;
  } catch (error: any) {
    return null;
  }
}

export function signTokens(payload: JWTPayload) {
  const accessToken = signJwt(payload, "accessToken");
  const refreshToken = signJwt(payload, "refreshToken");
  return {
    accessToken,
    refreshToken,
  };
}

export function deserializeTokens(req: Request, res: Response) {
  const accessToken = req.get("x-access-token");
  if (accessToken) {
    const accessDecoded = verifyJwt(accessToken);
    if (accessDecoded) return accessDecoded;
  }
  const refreshToken = req.get("x-refresh-token");
  if (refreshToken) {
    const refreshDecoded = verifyJwt(refreshToken);
    if (refreshDecoded) {
      const newAccessToken = signJwt(
        { userId: refreshDecoded.userId, sessionId: refreshDecoded.sessionId },
        "accessToken"
      );
      res.setHeader("x-access-token", newAccessToken);
      return refreshDecoded;
    }
  }
  return null;
}
