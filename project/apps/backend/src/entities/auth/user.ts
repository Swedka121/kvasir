import { defineEntity, p, type InferEntity } from "@mikro-orm/core";

export const User = defineEntity({
  name: "User",
  tableName: "user",
  properties: {
    id: p.string().primary(),
    name: p.string(),
    email: p.string().unique(),
    emailVerified: p.boolean().default(false),
    image: p.text().nullable(),
    createdAt: p.datetime(),
    updatedAt: p.datetime(),
  },
});

export type User = InferEntity<typeof User>;
