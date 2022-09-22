import React, { useState } from 'react'

export default function App() {
  const [counter, updateCounter] = useState(0)

  function onClick() {
    updateCounter(counter + 1)
  }

  return (
    <div>
      {counter}
      <button type="button" onClick={onClick}>Increment</button>
      It appears on the master branch.
    </div>
  )
}
