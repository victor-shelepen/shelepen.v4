import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './component/App'

const container = document.getElementById('root')
// const root = createRoot(container)
const root = hydrateRoot(container)
console.log('Hydrating...');
root.render(<App />)
