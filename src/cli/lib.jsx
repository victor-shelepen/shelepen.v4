import fs from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MemoryFS from 'memory-fs'
import path from 'path'
import { renderFile } from 'pug'
import requireFromString from 'require-from-string'
import rimraf from 'rimraf-promise'
import util from 'util'
import webpack, { DefinePlugin } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackMerge from 'webpack-merge'
import webpackConfig from '../../webpack.code.config'
import projectConfig from '../config'

const DIST_FOLDER = path.join(__dirname, '../../gh-pages')
export const rootPath = path.join(__dirname, '../../')

const webpackAsync = util.promisify(webpack)

export async function serve(page = 'home', language = 'en', port = 9000) {
  const mode = 'development'
  const config = webpackMerge(
    webpackConfig,
    {
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
          templateParameters: {
            language,
            mode,
          },
        }),
      ],
    },
  )
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

export async function buildPage(basePath, page = 'home', language = 'en') {
  fs.mkdirSync(basePath, { recursive: true })
  const mode = 'production'
  const webConfig = webpackMerge(
    webpackConfig,
    {
      mode: 'production',
      target: 'web',
      entry: `./src/page/${page}/index.jsx`,
      output: {
        path: basePath,
        filename: 'index_bundle.js',
      },
      optimization: {
        minimize: false,
      },
      plugins: [
        new DefinePlugin({
          CONFIG: JSON.stringify({
            mode,
            page,
            language,
          }),
        }),
      ],
    },
  )
  const nodeConfig = webpackMerge(
    webConfig,
    {
      target: 'node',
      entry: `./src/page/${page}/lib.jsx`,
      output: {
        library: 'app',
        libraryTarget: 'commonjs2',
      },
      optimization: {
        minimize: false,
      },
      plugins: [
        new DefinePlugin({
          CONFIG: JSON.stringify({
            mode,
            page,
            language,
          }),
        }),
      ],
    },
  )
  await webpackAsync(webConfig)
  const memoryFS = new MemoryFS()
  const nodeCompiler = webpack(nodeConfig)
  nodeCompiler.outputFileSystem = memoryFS
  await new Promise((resolve, reject) => {
    nodeCompiler.run((err, stats) => {
      if (err) {
        reject(err)
      }

      resolve(stats)
    })
  })
  const libraryContent = memoryFS.readFileSync(
    path.resolve(
      nodeConfig.output.path,
      nodeConfig.output.filename,
    ),
    'utf8',
  )
  const { app } = requireFromString(
    libraryContent,
    nodeConfig.output.filename,
  )
  const bodyHTML = app.default()
  const pageContent = renderFile(
    './pug/index.pug',
    {
      bodyHTML,
      language,
      mode,
    },
  )
  fs.writeFileSync(path.resolve(basePath, 'index.html'), pageContent)
}

export async function buildPageCommand(page, language) {
  await rimraf(DIST_FOLDER)
  fs.mkdirSync(DIST_FOLDER)
  const basePath = path.resolve(DIST_FOLDER, page, language)
  await buildPage(basePath, page, language)
}

export default async function build() {
  await rimraf(DIST_FOLDER)
  fs.mkdirSync(DIST_FOLDER)
  const {
    pages,
    languages,
    defaultPage,
    defaultLanguage,
  } = projectConfig
  await rimraf(DIST_FOLDER)
  fs.mkdirSync(DIST_FOLDER)
  const promises = []
  pages.forEach((page) => {
    const pageSpacePath = path.resolve(DIST_FOLDER, page)
    fs.mkdirSync(pageSpacePath)
    languages.forEach((language) => {
      const pageTranslatedPath = path.resolve(pageSpacePath, language)
      fs.mkdirSync(pageTranslatedPath)
      const promise = buildPage(pageTranslatedPath, page, language)
      promises.push(promise)
    })
  })
  await Promise.all(promises)
  const pageContent = renderFile('./pug/index-redirect.pug', {
    page: defaultPage,
    language: defaultLanguage,
  })
  fs.writeFileSync(path.resolve(DIST_FOLDER, 'index.html'), pageContent)
}
