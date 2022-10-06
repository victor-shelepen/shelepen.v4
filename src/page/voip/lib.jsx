import React, { useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import App, { useTranslator } from '../../component/App'
import text from './text.yml'
import { getConfig } from '../../lib'

export function HomePage() {
  const t = useTranslator()
  const [counter, updateCounter] = useState(29)

  function onClick() {
    updateCounter(counter + 1)
  }

  return (
    <div>
      Voip page...
      {t('title')}
      {counter}
      <button type="button" onClick={onClick}>Increment</button>
    </div>
  )
}

export function getRootComponent() {
  const config = getConfig()
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
