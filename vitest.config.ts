import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    include: ['./__tests__/**/*.test.[tj]s?(x)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
    ],
    environment: 'jsdom',
    globals: true,
    environmentMatchGlobs: [
      ['__tests__/**' ,'jsdom'],
    ],
  },
}));