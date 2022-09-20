import args from 'args'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../component/App'


args
  .command(
    'render',
    'Renders the site', function() {
      console.log(arguments);

      let appHTML = ReactDOMServer.renderToString(
        <App />
      );
      console.log(appHTML);
    },
  )

args.parse(process.argv)
