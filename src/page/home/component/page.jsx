import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import Image from 'mui-image'
import { useTranslator } from '../../../core/lib'

import faceImage from '../../../../assets/face-small.webp'
import golfImageSX from '../../../../assets/golf-sx.webp'
import golfImageSM from '../../../../assets/golf-sm.webp'

export default function Page() {
  const { t } = useTranslator()

  return (
    <Box>
      <Container maxWidth="lg">
        <Image
          src={faceImage}
          style={{
            borderRadius: '50px', width: '100px', height: '100px', float: 'left',
          }}
        />
        <Typography variant="h3">{t('introduction.title')}</Typography>
        <Box>
          {t('introduction.body', true)}
        </Box>
      </Container>
      <Box
        component="img"
        sx={{
          content: {
            xs: `url(${golfImageSX})`,
            sm: `url(${golfImageSM})`,
          },
        }}
        alt="Logo"
      />
    </Box>
  )
}
