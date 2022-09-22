import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React, { useState } from 'react'
import theme from '../theme'

export default function App() {
  const [counter, updateCounter] = useState(0)

  function onClick() {
    updateCounter(counter + 1)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        {counter}
        <button type="button" onClick={onClick}>Increment</button>
        It appears on the master branch.
        <Button>Click me</Button>
      </ThemeProvider>
    </div>
  )
}
