import fastGlob from 'fast-glob';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

// Globs of JS entry points.
const entryPoints = fastGlob.sync(['js/es6/*.js']);

// Plugins are largely shared.
const basePlugins = env => {
  const plugins = [
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    // Weird node/esm issue..should be just be babel({...}).
    babel.babel({
      // Pass environment name to reference babel.config.js setup.
      envName: env,
      exclude: /core-js/,
      babelHelpers: 'bundled',
    }),
  ];
  // Usually only minify for production.
  // Extra terser options for module code.
  if (env === 'module') {
    plugins.push(terser({
      ecma: 12,
      keep_classnames: true,
    }));
  }
  else {
    plugins.push(terser());
  }
  return plugins;
};

// Config for esm files with chunks.
const moduleConfig = {
  input: entryPoints,
  output: {
    dir: 'js/module',
    format: 'esm',
    chunkFileNames: 'chunks/[name]-[hash].js',
  },
  plugins: basePlugins('module'),
};

// Config for iife (nomodule) files.
const nomoduleConfig = file => ({
  input: file,
  output: {
    dir: 'js/nomodule',
    format: 'iife',
    name: path.parse(file).name,
  },
  preserveEntrySignatures: false,
  plugins: basePlugins('nomodule'),
});

// Build all configs.
const configs = [moduleConfig];
// Only build nomodule files for production to speed up dev.
if (process.env.NODE_ENV === 'production') {
  // Each entryPoint needs it's own config.
  entryPoints.forEach(file => {
    configs.push(nomoduleConfig(file));
  })
}

export default configs;
