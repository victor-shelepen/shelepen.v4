import React, { useState } from 'react'
import {
  Menu as MenuIcon,
} from '@mui/icons-material'
import {
  AppBar, Box, Button, Drawer, IconButton, List, ListItem, Toolbar, Typography, Link,
} from '@mui/material'
import { useTranslator } from '../lib'

export default function Header() {
  const { t, language } = useTranslator()
  const pages = [
    'home',
    'voip',
  ]
  const [open, setOpen] = useState(false)

  const toggleSlider = () => {
    setOpen(!open)
  }

  return (
    <div>
      {pages.map((page) => <div key={page}><a href={`/${page}/${language}`}>{t(`menu.${page}`)}</a></div>)}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="Menu"
            color="inherit"
            onClick={toggleSlider}
          >
            <MenuIcon />
          </IconButton>
          <Typography>
            Pet project
          </Typography>
          <Drawer open={open} anchor="right" onClose={toggleSlider}>
            <Box component="div">
              <List>
                <ListItem>
                  <Button color="inherit" component={Link} href={`/home/${language}`}>Home</Button>
                </ListItem>
                <ListItem>
                  <Button color="inherit" component={Link} href={`/home/${language}`}>Voip</Button>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  )
}
