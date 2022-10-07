import React, { createContext } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import get from 'lodash.get'

export function getConfig() {
  // eslint-disable-next-line no-undef
  return CONFIG
}

function render(component, rootId = 'root') {
  const container = document.getElementById(rootId)
  const root = createRoot(container)
  root.render(component)
}

function hydrate(component, toId = 'app') {
  const container = document.getElementById(toId)
  hydrateRoot(container, component)
}

export function inject(component) {
  const config = getConfig()
  if (config.mode === 'production') {
    hydrate(component)
  } else {
    render(component)
  }
}

export const TranslatorContext = createContext()

export function useTranslator() {
  const { text, language } = React.useContext(TranslatorContext)

  function t(key) {
    return get(text, key)[language]
  }

  return { t, language }
}
