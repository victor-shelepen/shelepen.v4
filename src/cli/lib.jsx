import fs from 'fs'
import path from 'path'
import { renderFile } from 'pug'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import rimraf from 'rimraf-promise'
import util from 'util'
import webpack from 'webpack'
import webpackConfig from '../../webpack.code.config'
import App from '../component/App'

const DIST_FOLDER = path.join(__dirname, '../../gh-pages')
const webpackAsync = util.promisify(webpack)

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
