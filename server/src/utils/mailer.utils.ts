import nodemailer from "nodemailer";
import config from "config";
import logger from "./logger.utils";
import { User } from "@prisma/client";

interface SMTPConfig {
  host: string;
  port: number;
  from: string;
  auth: {
    user: string;
    pass: string;
  };
}

const smtp = config.get<SMTPConfig>("smtp");
const clientUri = config.get<string>("clientUri");

const transporter = nodemailer.createTransport({
  pool: true,
  secure: true, // Only with port 465
  ...smtp,
});

export function verifySMTP() {
  transporter.verify((error, _) => {
    if (error) {
      logger.error(error, "SMTP Error");
      process.exit(1);
    }
    logger.info("Connected to SMTP");
  });
}

export function sendVerificationEmail(user: User) {
  const { id, email, verificationCode } = user;
  transporter.sendMail(
    {
      from: `Graphql TaskManager<${smtp.from}>`,
      to: email,
      subject: "Please verify your account",
      text: `${clientUri}/verify/${id}/${verificationCode}`,
    },
    (error, _) => {
      if (error) {
        logger.error(error, "VerificationEmail Error");
        return false;
      }
      logger.info(`Verification email sent to ${email}`);
      return true;
    }
  );
}

export function sendPasswordResetCodeEmail(user: User) {
  const { email, passwordResetCode } = user;
  transporter.sendMail(
    {
      from: `Graphql TaskManager<${smtp.from}>`,
      to: email,
      subject: "Password reset code",
      text: `Code: ${passwordResetCode}`,
    },
    (error, _) => {
      if (error) {
        logger.error(error, "PasswordResetCodeEmail Error");
        return false;
      }
      logger.info(`Password reset code sent to ${email}`);
      return true;
    }
  );
}
