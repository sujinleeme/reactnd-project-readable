import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.A300,
    boxShadow: 'none',
    minHeight: '100vh',
    paddingBottom: theme.spacing.unit * 3,
    margin: 0
  }
})

export const styles = withStyles(option)
