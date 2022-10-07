import { ThemeProvider } from '@mui/material/styles'
import React, { useState } from 'react'
import Header from './Header'
import { TranslatorContext } from '../lib'
import theme from '../../theme'

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
