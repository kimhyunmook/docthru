import { User } from "./common";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
