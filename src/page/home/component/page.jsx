import React, { useState } from 'react'
import Image from 'mui-image'
import { useTranslator } from '../../../core/lib'

export default function Page() {
  const { t } = useTranslator()
  const [counter, updateCounter] = useState(29)

  function onClick() {
    updateCounter(counter + 1)
  }

  return (
    <div>
      Home page...
      Hi, hi, hi!
      {t('title')}
      {counter}
      <button type="button" onClick={onClick}>Increment</button>
      <Image src="https://eventukraine.com/ev/wp-content/uploads/2019/07/golf_3685616_1920.jpg" showLoading />
    </div>
  )
}
