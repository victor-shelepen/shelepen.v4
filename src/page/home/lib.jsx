import React, { useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../../core/component/App'
import { getConfig, useTranslator } from '../../core/lib'
import coreText from '../../core/text.yml'
import pageText from './text.yml'

export function HomePage() {
  const { t } = useTranslator()
  const [counter, updateCounter] = useState(29)

  function onClick() {
    updateCounter(counter + 1)
  }

  return (
    <div>
      Home page...
      {t('title')}
      {counter}
      <button type="button" onClick={onClick}>Increment</button>
    </div>
  )
}

export function getRootComponent() {
  const config = getConfig()
  const text = { ...coreText, ...pageText }
  const translator = { text, language: config.language }
  return (
    <App translator={translator}>
      <HomePage />
    </App>
  )
}

export default function render() {
  const component = getRootComponent()
  const html = ReactDOMServer.renderToString(component)

  return html
}
