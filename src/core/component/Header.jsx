import React from 'react'

export default function Header() {
  const language = 'en'
  const pages = [
    'home',
    'voip',
  ]

  return (
    <div>
      {pages.map((page) => <a href="/{page}/{language}">{page}</a>)}
    </div>
  )
}
