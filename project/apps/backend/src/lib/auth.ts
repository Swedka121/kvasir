import { MikroORM } from '@mikro-orm/core';
import { betterAuth } from 'better-auth';
import { mikroOrmAdapter } from '@a77ay/better-auth-mikro-orm';
import { Logger } from '@nestjs/common';

const logger = new Logger("Better Auth")

export function createAuth(orm: MikroORM) {
  return betterAuth({
    database: mikroOrmAdapter(orm),
    baseURL: process.env.BETTER_AUTH_BASE_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    logger,
  });
}
