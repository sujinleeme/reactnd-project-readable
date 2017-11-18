import { withStyles } from 'material-ui/styles'

const option = theme => ({
  root: {
    borderBottom: '1px solid #ebebeb',
    background: '#fafafa',
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing.unit * 4
  },
  avatar: {
    marginRight: '16px'
  },
  input: {
    borderBottom: '1px solid #ebebeb',
    padding: '6px 15px 7px',
    marginLeft: theme.spacing.unit * 4,
    '&:hover': {
      cursor: 'text !important'
    }
  },
  error: {
    color: 'red',
    margin: '0',
    padding: '0',
    width: '30%'
  }
})


export const styles = withStyles(option)
