const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'development',
  devServer: { static: './dist', open: true },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new Dotenv() // qui viene gestito dotenv
  ]
};
