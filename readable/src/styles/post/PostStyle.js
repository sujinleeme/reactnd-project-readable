export const styles = theme => ({
  root: {},
  card: {
    maxWidth: '100%',
    '&:hover': {
      background: '#f9f9f9',
      transition: '.5s all',
      cursor: 'pointer',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  cardHeader: {
    width: '100%',
  },
  postMenu: {
    alignItems: 'right',
  },
  media: {
    height: '80px',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
  
  avatar: {
    backgroundColor: theme.palette.secondary,
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  
  favorite: {
    '&:hover': {
      color: 'red',
    },
  },
  liked: {
    color: 'red',
  },
  container: {
    display: 'flex',
    width: '100%',
  },
  input: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
})
