import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
    boxShadow: 'none',
    paddingLeft: theme.spacing.unit * 3
  }
})

export const styles = withStyles(option)
