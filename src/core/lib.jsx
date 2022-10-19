import React, { createContext } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import get from 'lodash.get'
import { parse } from 'marked'

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

  function t(key, marked = false) {
    const translations = get(text, key)
    if (!translations) {
      return key
    }
    let translation = translations[language]
    if (!translation) {
      return `${key}-${language}`
    }
    if (marked) {
      // eslint-disable-next-line react/no-danger
      translation = <div dangerouslySetInnerHTML={{ __html: parse(translation) }} />
    }

    return translation
  }

  return { t, language }
}
