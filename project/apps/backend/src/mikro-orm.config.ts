import { defineConfig } from '@mikro-orm/postgresql';
import { betterAuthEntities } from './entities/auth';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { Logger } from '@nestjs/common';
import { config as loadEnv } from 'dotenv';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { Migrator } from '@mikro-orm/migrations';

function findWorkspaceRoot(startDirectory: string): string {
  let directory = startDirectory;

  while (true) {
    if (existsSync(resolve(directory, 'nx.json'))) {
      return directory;
    }

    const parent = dirname(directory);
    if (parent === directory) {
      throw new Error('Could not locate the Nx workspace root (nx.json).');
    }
    directory = parent;
  }
}

if (!process.env.DB_URL)
  loadEnv({ path: resolve(findWorkspaceRoot(process.cwd()), '.env') });

const clientUrl = process.env.DB_URL;
if (!clientUrl) {
  throw new Error(
    'DB_URL must be set in the workspace root .env or environment.',
  );
}

const logger = new Logger('ORM');

export const mikroOrmConfig = defineConfig({
  clientUrl,
  debug: true,
  entities: [...betterAuthEntities],
  logger: logger.log.bind(logger),
  metadataProvider: ReflectMetadataProvider,
  extensions: [Migrator],
  migrations: {
    path:
      process.env.NODE_ENV == 'development'
        ? './apps/backend/dist/migrations'
        : './migrations',
    pathTs:
      process.env.NODE_ENV == 'development'
        ? './apps/backend/src/migrations'
        : undefined,
  },
});

export default mikroOrmConfig;
