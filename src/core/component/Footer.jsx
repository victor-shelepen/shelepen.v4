import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { getConfig, useTranslator } from '../lib'

export default function Footer() {
  const { t } = useTranslator()
  const config = getConfig()
  const locale = config.locales[config.language]
  const buildDate = new Intl
    .DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'long' })
    .format(new Date(config.buildDate))

  return (
    <Box sx={{ bgcolor: 'text.secondary', color: 'white', p: 1 }}>
      <Container maxWidth="lg">
        <Typography textAlign="center">
          {t('footer.builtAt')}
          &nbsp;
          { buildDate }
        </Typography>
      </Container>
    </Box>
  )
}
