import { SuccessMessage } from "./SuccessMessage";

export interface AuthPayload {
  accessToken: string;
  refreshToken: string;
  message: SuccessMessage;
}
