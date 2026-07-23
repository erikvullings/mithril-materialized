import { defineConfig } from 'vite';
import { mithrilInspector } from '@mithril-inspector/vite';
import path from 'node:path';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    plugins: [mithrilInspector({ editor: 'code' })],
    root: 'src',
    base: isBuild ? '/mithril-materialized/' : '/',
    server: {
      port: 1235,
      open: true,
      strictPort: true,
    },
    resolve: {
      alias: {
        mithril: path.resolve(__dirname, 'node_modules/mithril'),
      },
    },
    build: {
      outDir: '../../../docs',
      emptyOutDir: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          entryFileNames: 'bundle.js',
        },
      },
    },
  };
});
