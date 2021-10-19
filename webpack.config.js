/* eslint-disable */
const Path = require('path');

const common = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      }
    ]
  },
  devtool: false
};

const node = Object.assign({}, {
  entry: {
    'node': [
      Path.join(__dirname, 'src', 'node', 'index.js')
    ]
  },
  externals: {
    '@jitesoft/sprintf': '@jitesoft/sprintf',
    '@jitesoft/yolog':'@jitesoft/yolog/node.js'
  },
  target: 'node',
  output: {
    filename: 'node.js',
    libraryTarget: 'umd',
    library: '@jitesoft/yolog-json-plugin',
    globalObject: 'this'
  }
}, common);

const web = Object.assign({}, common, {
  entry: {
    'browser': [
      Path.join(__dirname, 'src', 'web', 'index.js')
    ]
  },
  externals: {
    '@jitesoft/sprintf': '@jitesoft/sprintf',
    '@jitesoft/yolog':'@jitesoft/yolog/browser.js'
  },
  target: 'web',
  output: {
    filename: 'browser.js',
    libraryTarget: 'umd',
    library: '@jitesoft/yolog-json-plugin'
  }
});

module.exports = [
  node, web
];
