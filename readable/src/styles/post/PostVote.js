export const styles = theme => ({
  root: {
    width: '100%'
  },
  button: {
    '&:hover': {
      color: theme.palette.primary.A100,
    },
  },
  clicked: {
    color: theme.palette.primary.A300,
  }
})
