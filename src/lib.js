import { createRoot, hydrateRoot } from 'react-dom/client'

// eslint-disable-next-line no-undef
export const config = CONFIG

export function render(component, rootId = 'root') {
  const container = document.getElementById(rootId)
  const root = createRoot(container)
  root.render(component)
}

export function hydrate(component, toId = 'app') {
  const container = document.getElementById(toId)
  hydrateRoot(container, component)
}

export default function process(component) {
  if (config.mode === 'production') {
    hydrate(component)
  } else {
    render(component)
  }
}
