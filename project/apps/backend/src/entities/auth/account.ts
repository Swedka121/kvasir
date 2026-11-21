import { defineEntity, p, type InferEntity } from "@mikro-orm/core";
import { User } from "./user";

export const Account = defineEntity({
  name: "Account",
  tableName: "account",
  properties: {
    id: p.string().primary(),
    accountId: p.text(),
    providerId: p.text(),
    userId: p.manyToOne(User).mapToPk().deleteRule("cascade").index(),
    accessToken: p.text().nullable(),
    refreshToken: p.text().nullable(),
    idToken: p.text().nullable(),
    accessTokenExpiresAt: p.datetime().nullable(),
    refreshTokenExpiresAt: p.datetime().nullable(),
    scope: p.text().nullable(),
    password: p.text().nullable(),
    createdAt: p.datetime(),
    updatedAt: p.datetime(),
  },
});

export type Account = InferEntity<typeof Account>;
