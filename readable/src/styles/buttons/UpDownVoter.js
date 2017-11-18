import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    width: '100%'
  },
  button: {
    '&:hover': {
      color: theme.palette.primary.A100
    }
  },
  clicked: {
    color: theme.palette.primary.A300
  }
})

export const styles = withStyles(option)

