import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import ts from 'typescript';

export default {
  input: './src/index.ts',
  external: ['mithril'],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'mithril-materialized',
      sourcemap: true,
      globals: {
        mithril: 'm', // This tells Rollup that `mithril` should be `m` in the browser
      },
    },
  ],
  plugins: [
    typescript({
      typescript: ts,
      // Exclude test files from the build
      exclude: ['**/__tests__/**/*'],
      declaration: true,
      declarationDir: './dist',
      rootDir: './src',
    }), // Handles TypeScript compilation
    postcss({
      // Use modern Sass API
      use: [
        [
          'sass',
          {
            api: 'modern-compiler',
            silenceDeprecations: ['legacy-js-api'],
            // Disable charset to match the minified version
            charset: false,
          },
        ],
      ],
      // Extract to separate CSS file
      extract: 'index.css',
      // Add autoprefixer
      plugins: [autoprefixer()],
    }),
  ],
};
