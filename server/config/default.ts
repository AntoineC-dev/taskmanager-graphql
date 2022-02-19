import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.SERVER_PORT,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};
