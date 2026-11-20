import { defineConfig } from 'rolldown';
import packageJson from './package.json' with { type: 'json' };

// Installed at runtime instead of bundled (native addons, dynamic requires).
const dependencies = Object.keys(packageJson.dependencies);

export default defineConfig([
  {
    input: 'src/main.ts',
    platform: 'node',
    tsconfig: 'tsconfig.app.json',
    transform: {
      decorator: {
        emitDecoratorMetadata: true,
      }
    },
    external: (id) =>
      dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`)),
    output: {
      dir: 'dist',
      cleanDir: true,
      format: 'esm',
      sourcemap: true,
    },
  },
]);
