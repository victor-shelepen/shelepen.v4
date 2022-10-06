import get from 'lodash.get'
import { ThemeProvider } from '@mui/material/styles'
import React, { useState, createContext } from 'react'
import Header from './Header'
import theme from '../../theme'

const TranslatorContext = createContext()

export function getTranslator(text, language) {
  return function t(key) {
    return get(text, key)[language]
  }
}

export function useTranslator() {
  const translator = React.useContext(TranslatorContext)

  return getTranslator(translator.text, translator.language)
}

export default function App({ translator, children }) {
  const [counter, updateCounter] = useState(28)

  function onClick() {
    updateCounter(counter + 1)
  }

  return (
    <div>
      <TranslatorContext.Provider value={translator}>
        <ThemeProvider theme={theme}>
          <Header />
          {counter}
          <button type="button" onClick={onClick}>Increment</button>
          { children }
        </ThemeProvider>
      </TranslatorContext.Provider>
    </div>
  )
}
