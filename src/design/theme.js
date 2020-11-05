import { createMuiTheme } from '@material-ui/core/styles'

const primaryColor = '#1565C0'
const secondaryColor = '#2196f3'
const successColor = '#7db82f'
const errorColor = '#ec4239'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor
    },
    secondary: {
      main: secondaryColor
    },
    success: {
      main: successColor
    },
    error: {
      main: errorColor
    }
  },
  typography: {
    fontFamily: ['"Lato"', 'Arial', 'sans-serif'].join(','),
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
})

export default theme