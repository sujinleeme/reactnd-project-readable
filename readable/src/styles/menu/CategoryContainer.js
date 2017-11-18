import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    marginRight: '8px',
    marginTop: '8px',
    backgroundColor: theme.palette.background.A300,
    fontWeight: 'bolder'
  },
  label: {
    textTransform: 'capitalize'
  },
  active: {
    background: '#4FC3F7 !important'
  }
})

export const styles = withStyles(option)
