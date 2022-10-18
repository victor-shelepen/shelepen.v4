import React, { useState } from 'react'
import {
  Menu as MenuIcon,
} from '@mui/icons-material'
import {
  AppBar, Box, Button, Drawer, IconButton, List, ListItem, Toolbar, Typography, Link, Divider,
} from '@mui/material'
import { getConfig, useTranslator } from '../lib'

export default function Header() {
  const { page: currentPage } = getConfig()
  const { t, language: currentLanguage } = useTranslator()
  const pages = [
    'home',
    'voip',
  ]
  const languages = [
    'en',
    'ru',
    'ua',
  ]
  const [open, setOpen] = useState(false)

  const toggleSlider = () => {
    setOpen(!open)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="Menu"
            color="inherit"
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={toggleSlider}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
          >
            Shelepen
          </Typography>
          <Typography sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {
              pages
                .filter((p) => p !== currentPage)
                .map((page) => (
                  <Button
                    key={page}
                    component={Link}
                    variant="text"
                    sx={{ color: '#fff' }}
                    href={`/${page}/${currentLanguage}`}
                  >
                    {t(`menu.${page}`)}
                  </Button>
                ))
            }
            |
            {
              languages
                .filter((l) => l !== currentLanguage)
                .map((language) => (
                  <Button
                    key={language}
                    component={Link}
                    variant="text"
                    sx={{ color: '#fff' }}
                    href={`/${currentPage}/${language}`}
                  >
                    {t(`language.${language}`)}
                  </Button>
                ))
            }
          </Box>
          <Drawer open={open} anchor="right" onClose={toggleSlider}>
            <Box component="div">
              <List>
                {
                  pages
                    .filter((p) => p !== currentPage)
                    .map((page) => (
                      <ListItem key={page}>
                        <Button
                          component={Link}
                          variant="text"
                          href={`/${page}/${currentLanguage}`}
                        >
                          {t(`menu.${page}`)}
                        </Button>
                      </ListItem>
                    ))
                }
                <Divider />
                {
                  languages
                    .filter((l) => l !== currentLanguage)
                    .map((language) => (
                      <ListItem key={language}>
                        <Button
                          component={Link}
                          href={`/${currentPage}/${language}`}
                        >
                          {t(`language.${language}`)}
                        </Button>
                      </ListItem>
                    ))
                }
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  )
}
