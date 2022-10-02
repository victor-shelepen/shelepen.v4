import React from 'react'
import process from '../../lib'
import AppBuilder, { useText } from '../../component/App'
import text from './text.yml'

export default function HomePage() {
  const t = useText()

  return (
    <div>
      Voip page...
      { t('title') }
    </div>
  )
}

const App = AppBuilder(text, HomePage)
process(<App />)
