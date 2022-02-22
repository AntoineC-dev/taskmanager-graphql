import { Task } from "./Task";

export interface User {
  id: string;
  username: string;
  email: string;
  tasks: Task[];
}
