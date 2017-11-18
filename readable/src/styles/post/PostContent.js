import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  cardHeader: {
    width: '100%'
  },
  avatar: {
    backgroundColor: theme.palette.secondary
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  postLabel: {
    borderRadius: '0',
    color: 'white',
    height: '50%',
    backgroundColor: '#4FC3F7',
    fontSize: '14px',
    minHeight: '0 !important',
    padding: '5px',
    width: '30px'
  },
  title: {
    margin: theme.spacing.unit
  },
  body: {
    margin: theme.spacing.unit
  },
  content: {
    width: '100%'
  }
})

export const styles = withStyles(option)

