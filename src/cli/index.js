import args from 'args'
import render, { serve } from './lib'

args
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
    async () => {
      serve()
    },
  )

args.parse(process.argv)
