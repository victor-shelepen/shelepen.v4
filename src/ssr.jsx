import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './component/App'

const container = document.getElementById('app')
hydrateRoot(container, <App />)
console.log('Hydrating...2');

