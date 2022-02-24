import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import config from "config";
import { extractRefreshTokenFromCookies } from "./cookies.utils";
import { clearRefreshTokenCookie } from ".";

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
  const accessToken = req.headers.authorization;
  if (accessToken) {
    const decoded = verifyJwt(accessToken);
    if (decoded) return decoded;
  }
  const refreshToken = req.get("x-refresh-token");
  console.log("refreshToken:", refreshToken);
  if (refreshToken) {
    const decoded = verifyJwt(refreshToken);
    if (decoded) {
      const { sessionId, userId } = decoded;
      const newAccessToken = signJwt({ userId, sessionId }, "accessToken");
      res.setHeader("x-access-token", newAccessToken);
      console.log("accessToken refreshed");
      return decoded;
    }
  }
  return null;
}
