import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import Image from 'mui-image'
import { useTranslator } from '../../../core/lib'
import victorImage from '../../../../assets/victor-1.jpg'

export default function Page() {
  const { t } = useTranslator()

  return (
    <Box>
      <Container maxWidth="lg">
        <Image
          src={victorImage}
          style={{
            borderRadius: '50px', width: '100px', height: '100px', float: 'left',
          }}
        />
        <Typography variant="h3">{t('introduction.title')}</Typography>
        <Typography variant="body2"><div>{t('introduction.body', true)}</div></Typography>
      </Container>
      <Image src="https://eventukraine.com/ev/wp-content/uploads/2019/07/golf_3685616_1920.jpg" showLoading />
    </Box>
  )
}
