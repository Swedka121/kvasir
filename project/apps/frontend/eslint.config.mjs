import nx from '@nx/eslint-plugin';
import nextVitals from 'eslint-config-next/core-web-vitals';
import baseConfig from '../../eslint.config.mjs';

const eslintConfig = [
  ...nextVitals,
  ...nx.configs['flat/react-typescript'],
  ...baseConfig,
  {
    ignores: ['.next/**/*', '**/out-tsc'],
  },
];

export default eslintConfig;
