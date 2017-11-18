import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    display: 'flex',
    float: 'right'
  },
  button: {
    margin: theme.spacing.unit,
    color: theme.palette.primary.A300,
    fontWeight: 'bold',
    '&:hover': {
      background: theme.palette.primary.A50, transition: '.5s all'
    }
  }
})

export const styles = withStyles(option)
