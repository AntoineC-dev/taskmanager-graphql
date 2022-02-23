import { object, string, TypeOf } from "zod";

export const registerFormSchema = object({
  username: string().nonempty({
    message: "Username is required",
  }),
  email: string().email({
    message: "Invalid email format",
  }),
  password: string()
    .min(8, "Password must be at least 8 chars")
    .max(26, "Password must be less than 26 chars")
    .regex(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), {
      message: "Password too weak (1 lowercase, 1 uppercase, 1 number, 1 special char)",
    }),
  passwordConfirmation: string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

export const loginFormSchema = object({
  email: string().email({
    message: "Invalid email format",
  }),
  password: string().nonempty({ message: "Password is required" }),
});

export type RegisterFormInput = TypeOf<typeof registerFormSchema>;
export type LoginFormInput = TypeOf<typeof loginFormSchema>;
