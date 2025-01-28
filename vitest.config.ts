import {defineConfig} from 'vitest/config';

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/restDocs/results/**'],
    },
  },
  test: {
    globals: true,
    snapshotFormat: {
      escapeString: false,
    },
  },
});
