import React, { useState } from 'react';

export default function() {
  const [counter, updateCounter] = useState(0);

  function onClick() {
    updateCounter(counter+1)
  }

  return (
    <div>
      {counter}
      <button onClick={onClick}>Increment</button>
    </div>
  )
}