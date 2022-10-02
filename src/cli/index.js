import args from 'args'
import render, { serve } from './lib'

args
  .option('page', 'Page', 'home')
  .option('language', 'Language', 'en')
  .command(
    'render',
    'Renders the site',
    async () => {
      render()
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
