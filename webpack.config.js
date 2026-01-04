const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'development',
  devServer: {
    static: './dist',
    open: true
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' }
    ]
  },
  plugins: [
    new Dotenv({
      systemvars: true
    }),

    new webpack.DefinePlugin({
      'process.env.API_BASE': JSON.stringify(process.env.API_BASE),
      'process.env.COVERS_BASE': JSON.stringify(process.env.COVERS_BASE)
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ]
};
