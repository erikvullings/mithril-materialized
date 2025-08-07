import typescript from '@rollup/plugin-typescript';
import sass from 'rollup-plugin-sass';

export default {
  input: './src/index.ts',
  external: ['mithril'],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'mithril-materialized',
      globals: {
        mithril: 'm', // This tells Rollup that `mithril` should be `m` in the browser
      },
    },
  ],
  plugins: [
    typescript({
      // Exclude test files from the build
      exclude: ['**/__tests__', '**/test-utils.ts', '**/test-setup.ts'],
    }), // Handles TypeScript compilation
    sass({
      // This will compile Sass files and output a separate CSS file
      output: 'dist/index.css',
      insert: false,
    }),
  ],
};
