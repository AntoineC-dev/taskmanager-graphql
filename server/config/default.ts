import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.SERVER_PORT,
  clientUri: process.env.CLIENT_URI,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    from: process.env.SMTP_USER,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
};
