import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { TranslatorContext } from '../lib'
import theme from '../../theme'

export default function App({ translator, children }) {
  return (
    <div>
      <TranslatorContext.Provider value={translator}>
        <ThemeProvider theme={theme}>
          <Header />
          { children }
          <Footer />
        </ThemeProvider>
      </TranslatorContext.Provider>
    </div>
  )
}
