import { defineEntity, p, type InferEntity } from "@mikro-orm/core";
import { User } from "./user";

export const Session = defineEntity({
  name: "Session",
  tableName: "session",
  properties: {
    id: p.string().primary(),
    expiresAt: p.datetime(),
    token: p.string().unique(),
    createdAt: p.datetime(),
    updatedAt: p.datetime(),
    ipAddress: p.text().nullable(),
    userAgent: p.text().nullable(),
    userId: p.manyToOne(User).mapToPk().deleteRule("cascade").index(),
  },
});

export type Session = InferEntity<typeof Session>;
