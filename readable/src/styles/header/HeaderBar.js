import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    minHeight: '150px'
  },
  header: {
    display: 'block',
    padding: theme.spacing.unit * 2
  },
  typoLogo: {
    display: 'flex', marginBottom: theme.spacing.unit * 2
  },
  detailTypoLogo: {
    marginLeft: theme.spacing.unit * 2
  }
})

export const styles = withStyles(option)
