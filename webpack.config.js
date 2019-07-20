const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'production',
  devtool: 'eval',
  entry: {
    main: './app/entry.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js' 
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    stats: 'errors-only',
    host: '192.168.0.100',
    disableHostCheck: true,
    hot: true,
    port: 8085,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|png|svg|jpg|gif)$/, 
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader','vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
      }
    ]
  },
  resolve: { 
    alias: { 
      vue: 'vue/dist/vue.esm.js' 
    } 
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
      inject: true,
      chunks: ['main']
    }),
    new StyleLintPlugin({
      extends: 'stylelint-config-standard'
    })
  ]
};