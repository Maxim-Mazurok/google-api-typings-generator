import {UserConfig, defineConfig} from 'vitest/config';

export const baseConfig: UserConfig = {
  test: {
    globals: true,
    snapshotFormat: {
      escapeString: false,
    },
  },
};

export default defineConfig(baseConfig);
