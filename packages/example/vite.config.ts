import { defineConfig } from 'vite';
import { mithrilInspector } from '@mithril-inspector/vite';
import path from 'node:path';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  const libRoot = path.resolve(__dirname, '../lib');

  return {
    // `projectRoots` lets the inspector's open-in-editor endpoint accept files
    // from the sibling `lib` package, which lives outside this project's Vite
    // root (`src`) — otherwise every mithril-materialized component source
    // resolves outside its allowed roots (§10.4).
    plugins: [mithrilInspector({ editor: 'code', projectRoots: [libRoot] })],
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
        // In dev, resolve straight to the library's TypeScript source instead
        // of its built dist bundle: the inspector instruments whatever file
        // Vite hands it, so importing dist/index.esm.js means every
        // mithril-materialized component's "open in editor" location points
        // at the compiled bundle rather than the real source (and the dist
        // bundle ships no source map to recover it). The production build
        // keeps using the published package resolution below.
        ...(isBuild
          ? {}
          : {
              // Same rationale for the `index.css` subpath export: dist/index.css
              // is generated as a side effect of the library's own rollup build
              // (postcss extracting whatever `./index.scss` pulls in) and doesn't
              // exist until that build runs; the source .scss produces the same
              // stylesheet directly.
              'mithril-materialized/index.css': path.resolve(libRoot, 'src/index.scss'),
              'mithril-materialized': path.resolve(libRoot, 'src/index.ts'),
            }),
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
