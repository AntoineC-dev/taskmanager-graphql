import { object, string, TypeOf } from "zod";
import { requiredField } from "./errors";

export const createTaskSchema = object({
  title: string().nonempty({ message: requiredField("Title") }),
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
