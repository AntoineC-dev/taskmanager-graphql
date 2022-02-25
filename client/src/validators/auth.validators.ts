import { object, string, TypeOf } from "zod";
import { doNotMatch, invalidFormat, passwordTooLong, passwordTooShort, passwordTooWeak, requiredField } from "./errors";

export const registerFormSchema = object({
  username: string().nonempty({ message: requiredField("username") }),
  email: string().email({ message: invalidFormat("email") }),
  password: string()
    .min(8, passwordTooShort(8))
    .max(20, passwordTooLong(20))
    .regex(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), { message: passwordTooWeak() }),
  passwordConfirmation: string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: doNotMatch("passwords"),
  path: ["passwordConfirmation"],
});

export const loginFormSchema = object({
  email: string().email({ message: invalidFormat("email") }),
  password: string().nonempty({ message: requiredField("password") }),
});

export const emailFormSchema = object({ email: string().email({ message: invalidFormat("email") }) });

export const passwordFormSchema = object({
  password: string()
    .min(8, passwordTooShort(8))
    .max(20, passwordTooLong(20))
    .regex(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), { message: passwordTooWeak() }),
  passwordConfirmation: string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: doNotMatch("passwords"),
  path: ["passwordConfirmation"],
});

export type RegisterFormInput = TypeOf<typeof registerFormSchema>;
export type LoginFormInput = TypeOf<typeof loginFormSchema>;
export type EmailFormInput = TypeOf<typeof emailFormSchema>;
export type PasswordFormInput = TypeOf<typeof passwordFormSchema>;
