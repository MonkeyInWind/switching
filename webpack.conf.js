const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPluginConfig = {
  template: './index.html',
  inject: 'body',
  minify: true
}

module.exports = {
  entry: './src/js/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './js/[hash]index.js',
    hashDigestLength: 8
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            atttrs: [':data-src']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash:8].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(HtmlWebpackPluginConfig)
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 9090,
    open: true,
    inline: true,
    compress: true
  }
}
