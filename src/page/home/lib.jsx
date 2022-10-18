import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../../core/component/App'
import Page from './component/page'
import { getConfig } from '../../core/lib'
import coreText from '../../core/text.yml'
import pageText from './text.yml'

export function getRootComponent() {
  const config = getConfig()
  const text = { ...coreText, ...pageText }
  const translator = { text, language: config.language }
  return (
    <App translator={translator}>
      <Page />
    </App>
  )
}

export default function render() {
  const component = getRootComponent()
  const html = ReactDOMServer.renderToString(component)

  return html
}
