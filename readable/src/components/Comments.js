import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getComments } from '../modules/menu/actions/comments'

import Input from 'material-ui/Input'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  container: {
    display: 'flex',
    width: '100%',
  },
  input: {
    margin: theme.spacing.unit,
    width: '100%',
  },
})

class Comments extends React.Component {
  componentDidMount () {
    // this.props.fetchComments()
  }
  
  render () {
    const classes = this.props
  
    return (
      <div>

        <div className={classes.container}>
          <Avatar className="">OP</Avatar>
          <Typography component="p">
            {/*{post.body}*/}
          </Typography>
        
        </div>
      </div>
    
    )
    
  }
  
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    selectMenu: {
      category: state.currentMenu.category,
      tab: state.currentMenu.tab,
    },
    categories: state.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(getComments(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(Comments)))
