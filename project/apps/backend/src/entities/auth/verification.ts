import { defineEntity, p, type InferEntity } from "@mikro-orm/core";

export const Verification = defineEntity({
  name: "Verification",
  tableName: "verification",
  properties: {
    id: p.string().primary(),
    identifier: p.string().index(),
    value: p.text(),
    expiresAt: p.datetime(),
    createdAt: p.datetime(),
    updatedAt: p.datetime(),
  },
});

export type Verification = InferEntity<typeof Verification>;
