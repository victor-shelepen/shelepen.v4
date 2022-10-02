const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./webpack.code.config')

module.exports = merge(
  config,
  {
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './pug/index.pug'),
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin(),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 9000,
    },
  },
)
