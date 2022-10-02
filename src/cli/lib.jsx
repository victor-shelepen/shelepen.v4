import fs from 'fs'
import path from 'path'
import { renderFile } from 'pug'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import rimraf from 'rimraf-promise'
import util from 'util'
import webpack, { DefinePlugin } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackConfig from '../../webpack.code.config'
import App from '../component/App'

const DIST_FOLDER = path.join(__dirname, '../../gh-pages')
export const rootPath = path.join(__dirname, '../../')

const webpackAsync = util.promisify(webpack)

export async function serve(page = 'home', language = 'en', port = 9000) {
  const mode = 'development'
  const config = {
    ...webpackConfig,
    devtool: 'source-map',
    mode,
    entry: `./src/page/${page}/index.jsx`,
    plugins: [
      new DefinePlugin({
        CONFIG: JSON.stringify({
          mode,
          page,
          language,
        }),
      }),
      new HtmlWebpackPlugin({
        template: path.join(rootPath, './pug/index.pug'),
        filename: 'index.html',
      }),
    ],
  }
  const options = {
    port,
    watchFiles: ['src/**/*.jsx'],
  }
  const compiler = webpack(config)
  const server = new WebpackDevServer(options, compiler)
  server.startCallback(() => {
    // eslint-disable-next-line no-console
    console.log(`Starting server on ${port} port.`)
  })
}

export default async function render() {
  await rimraf(DIST_FOLDER)
  fs.mkdirSync(DIST_FOLDER)
  webpackAsync({
    ...webpackConfig,
    mode: 'production',
    entry: './src/ssr.jsx',
    output: {
      path: DIST_FOLDER,
      filename: 'index_bundle.js',
    },
  })
  const bodyHTML = ReactDOMServer.renderToString(
    <App />,
  )
  const content = renderFile('./pug/frame.pug', { bodyHTML })
  fs.writeFileSync(path.resolve(DIST_FOLDER, 'index.html'), content)
}
