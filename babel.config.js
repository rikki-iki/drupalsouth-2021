module.exports = {
  env: {
    module: {
      presets: [['@babel/preset-env', {
        targets: { esmodules: true },
        bugfixes: true,
        useBuiltIns: 'usage',
        corejs: '3.6',
      }]],
    },
    nomodule: {
      presets: [['@babel/preset-env', {
        useBuiltIns: 'usage',
        corejs: '3.6',
      }]],
    },
  },
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
};
