import args from 'args'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../component/App'

import path from 'path'
const DIST_FOLDER = path.join(__dirname, '../../dist_folder');

import util from 'util'
import webpack from 'webpack'
const webpackAsync = util.promisify(webpack)
import rimraf from 'rimraf-promise'
import fs from 'fs'
import { renderFile } from 'pug'
import webpackConfig from '../../webpack.code.config'



async function render() {
  await rimraf(DIST_FOLDER)
  fs.mkdirSync(DIST_FOLDER)
  webpackAsync({
    ...webpackConfig,
    entry: "./src/index.js",
    output: {
      path: DIST_FOLDER,
      filename: "index_bundle.js"
    },
  });

  let bodyHTML = ReactDOMServer.renderToString(
    <App />
  );

  const content = renderFile('./pug/frame.pug', { bodyHTML });
  fs.writeFileSync(path.resolve(DIST_FOLDER, 'index.html'), content)

  console.log('Done!');
}

args
  .command(
    'render',
    'Renders the site', async function() {
      await console.log(arguments);
      render()
    },
  )

args.parse(process.argv)
