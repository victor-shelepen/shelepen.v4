import args from 'args'
import render from './lib'

args
  .command(
    'render',
    'Renders the site',
    async () => {
      render()
    },
  )

args.parse(process.argv)
