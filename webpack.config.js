const path = require('path');
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
  devServer: { static: './dist', open: true },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' }
    ]
  },
  plugins: [
    new Dotenv({
    systemvars: true // <--- legge anche le environment variables di Netlify
  }),
    new HtmlWebpackPlugin({
      template: './index.html',  // il tuo HTML nella root
      filename: 'index.html'     // generato dentro dist/
    })
  ]
};
