import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import PostCardList from '../post/body/PostCardList'

import NewPost from '../post/create/NewPost'
import FloatingNewPostButton from '../post/buttons/FloatingNewPostButton'
import LoadingProgress from '../assests/LoadingProgress'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
  },
  
})

class NotFound extends React.Component {
  
  componentDidMount () {
  
  }
  
  render () {
    const {classes, postList, location, currentCategory, currentTab} = this.props
    const {loading} = postList
    const posts = postList.posts
    if (loading) {
      return <LoadingProgress/>
    }
    return (
      
      <div className={classes.root}>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
      
      </div>
    
    )
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    postList: state.posts.postList,
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
  
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(NotFound)))