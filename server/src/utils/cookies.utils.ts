import { Response } from "express";
import config from "config";

interface CookieConfig {
  httpOnly: boolean;
  sameSite: "none" | "lax" | "strict";
  secure: boolean;
  maxAge: number;
}

const cookieOptions = config.get<CookieConfig>("cookieOptions");

export function createRefreshTokenCookie(res: Response, token: string) {
  return res.cookie("refreshToken", token, cookieOptions);
}

export function clearRefreshTokenCookie(res: Response) {
  return res.clearCookie("refreshToken");
}

export function extractRefreshTokenFromCookies(cookies: string | undefined) {
  if (cookies) {
    const values = cookies.split(";").reduce((res, item) => {
      const data = item.trim().split("=");
      return { ...res, [data[0]]: data[1] };
    }, {});
    return (values as any).refreshToken;
  } else {
    return null;
  }
}
