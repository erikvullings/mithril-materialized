import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

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
      exclude: ['**/__tests__/**/*'],
    }), // Handles TypeScript compilation
    postcss({
      // Use modern Sass API
      use: [
        ['sass', { 
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api']
        }]
      ],
      // Extract to separate CSS file
      extract: 'index.css',
      // Add autoprefixer
      plugins: [autoprefixer()],
    }),
  ],
};
