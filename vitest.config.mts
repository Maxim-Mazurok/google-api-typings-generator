import {UserConfig, defineConfig} from 'vitest/config';

export const baseConfig: UserConfig = {
  test: {
    globals: true,
    snapshotFormat: {
      escapeString: false,
    },
    watchExclude: ['**/restDocs/results/**'],
  },
};

export default defineConfig(baseConfig);
