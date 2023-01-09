import args from 'args'
import build, { buildPageCommand, serve } from './lib'

args
  .option('page', 'Page', 'home')
  .option('language', 'Language', 'en')
  .command(
    'build-page',
    'builds a page of the site',
    async (_, __, options) => {
      buildPageCommand(options.page, options.language)
    },
  )
  .command(
    'build',
    'builds the site',
    async (_, __, options) => {
      build(true)
    },
  )
  .command(
    'serve',
    'Serves the page.',
    async (_, __, options) => {
      serve(options.page, options.language)
    },
  )

args.parse(process.argv)
