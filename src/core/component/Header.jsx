import React from 'react'
import { useTranslator } from '../lib'

export default function Header() {
  const { t, language } = useTranslator()
  const pages = [
    'home',
    'voip',
  ]

  return (
    <div>
      {pages.map((page) => <div key={page}><a href={`/${page}/${language}`}>{t(`menu.${page}`)}</a></div>)}
    </div>
  )
}
