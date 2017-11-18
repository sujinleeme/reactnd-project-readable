import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  group: {
    display: 'flex',
    justifyContent: 'flex-end'

  },
  copyright: {
    marginLeft: theme.spacing.unit,
    fontSize: '14px'
  }
})

export const styles = withStyles(option)
