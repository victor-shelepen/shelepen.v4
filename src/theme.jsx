import { createTheme } from '@mui/material/styles'
import { teal, grey, orange } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: grey,
  },
  status: {
    danger: orange,
  },
})

export default theme
