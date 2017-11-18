import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300
  }
})

export const styles = withStyles(option)
