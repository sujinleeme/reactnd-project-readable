import React from 'react'
import PropTypes from 'prop-types'
import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid'
import PostList from './PostList'
import PaperSheet from './PaperSheet'
import CreatePost from './CreatePost'
import MainTabs from './MainTabs'
import { withStyles } from 'material-ui/styles'



const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
  },
})

class PostContainer extends React.Component {

  
  render () {
    const {classes, location} = this.props
    
    return (
   
            
            <div className={classes.root} >
              <CreatePost/>
              <PostList/>
              <PostList/>
            </div>
          
    )
  }
}

PostContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostContainer)