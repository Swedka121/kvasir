import { MikroORM } from '@mikro-orm/core';
import { betterAuth } from 'better-auth';
import { mikroOrmAdapter } from '@a77ay/better-auth-mikro-orm';
import { Logger } from '@nestjs/common';
import { oneTimeToken } from 'better-auth/plugins';

const logger = new Logger('Better Auth');

export function createAuth(orm: MikroORM) {
  const configuredBaseURL = process.env.BETTER_AUTH_BASE_URL;

  return betterAuth({
    database: mikroOrmAdapter(orm),
    baseURL: configuredBaseURL
      ? new URL(configuredBaseURL).origin
      : undefined,
    basePath: '/api/auth',
    secret: process.env.BETTER_AUTH_SECRET,
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    trustedOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'tauri://localhost',
      'http://tauri.localhost',
    ],
    plugins: [oneTimeToken({ expiresIn: 1, storeToken: 'hashed' })],
    logger,
  });
}
