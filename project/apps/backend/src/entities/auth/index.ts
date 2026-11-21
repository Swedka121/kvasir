import { User } from "./user";
import { Session } from "./session";
import { Account } from "./account";
import { Verification } from "./verification";

export {
  User,
  Session,
  Account,
  Verification,
};

export const betterAuthEntities = [
  User,
  Session,
  Account,
  Verification,
] as const;
