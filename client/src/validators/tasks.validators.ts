import { object, string, TypeOf } from "zod";
import { requiredField } from "./errors";

export const createTaskSchema = object({
  title: string().nonempty({ message: requiredField("Title") }),
  description: string().nonempty({ message: requiredField("Description") }),
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
