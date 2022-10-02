import get from 'lodash.get'
import { ThemeProvider } from '@mui/material/styles'
import React, { useState, createContext } from 'react'
import theme from '../theme'
import { getConfig } from '../lib'

const TextContext = createContext()

export function useText() {
  const config = getConfig()
  const text = React.useContext(TextContext)

  return function t(key, language = config.language) {
    return get(text, key)[language]
  }
}

export default function AppBuilder(text, Component) {
  return function App() {
    const [counter, updateCounter] = useState(0)

    function onClick() {
      updateCounter(counter + 1)
    }

    return (
      <div>
        <TextContext.Provider value={text}>
          <ThemeProvider theme={theme}>
            {counter}
            <button type="button" onClick={onClick}>Increment</button>
            <Component />
          </ThemeProvider>
        </TextContext.Provider>
      </div>
    )
  }
}
