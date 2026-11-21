import { defineConfig } from 'rolldown';
import packageJson from './package.json' with { type: 'json' };
import * as fs from 'node:fs';
import path, { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Installed at runtime instead of bundled (native addons, dynamic requires).
const dependencies = Object.keys(packageJson.dependencies);

const configDir = dirname(fileURLToPath(import.meta.url));
const migrationsDir = resolve(configDir, 'src/migrations');

const migrationInputs = fs.existsSync(migrationsDir)
  ? fs
      .readdirSync(migrationsDir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name.endsWith('.ts') &&
          !entry.name.endsWith('.d.ts'),
      )
      .map((entry) => resolve(migrationsDir, entry.name))
  : [];

export default defineConfig([
  {
    input: ['src/main.ts', ...migrationInputs],
    platform: 'node',
    tsconfig: 'tsconfig.app.json',
    transform: {
      decorator: {
        emitDecoratorMetadata: true,
      },
    },
    external: (id) =>
      dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`)),
    output: {
      dir: 'dist',
      cleanDir: true,
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
    },
  },
]);
