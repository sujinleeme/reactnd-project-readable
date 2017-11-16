import {createMuiTheme} from 'material-ui/styles'
import {lightBlue, green, grey} from 'material-ui/colors'

const CustomTheme = createMuiTheme({
  palette: {
    primary: {
      ...lightBlue,
      A300: '#4FC3F7',
      A50: '#E1F5FE'
    },
    secondary: {
      ...green,
      A400: '#4FC3F7'
    },
    background: {
      ...grey,
      A300: '#f5f5f5'
    }
  },

  overrides: {
    MuiTypography: {
      headline: {
        fontFamily: '\'Inconsolata\', monospace',
        fontSize: '20px',
        letterSpacing: '0.02rem',
        fontWeight: 'bolder'
      }
    },

    MuiButton: {
      root: {
        borderRadius: '15px',
        fontFamily: '\'Inconsolata\', monospace'
      },
      raised: {
        color: '#616161'
      }

    },
    MuiAppBar: {
      root: {
        color: 'inherit'
      }
    },
    MuiTab: {
      root: {
        minWidth: '80px !important'
      }

    },
    MuiPaper: {
      root: {
        borderRadius: '0 !important'
      }

    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: 'none'
        }
      }
    },
    MuiDialog: {
      paperWidthSm: {
        maxWidth: '620px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '0'
      }
    },
    MuiDialogActions: {
      root: {
        padding: '0',
        margin: '0'
      },
      button: {
        minWidth: 'auto'
      }
    }
  }
})

export default CustomTheme
