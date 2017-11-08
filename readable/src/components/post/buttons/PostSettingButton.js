import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { deletePostContent, getPostLists } from '../../../modules/actions/posts'

import PropTypes from 'prop-types'

const styles = theme => {
  return ({
    root: {
    

    },
    label: {
      textTransform: 'capitalize',
    },
  })
}

const options = [
  'Edit',
  'Delete',
]

const ITEM_HEIGHT = 48

class PostSettingButton extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    selectedIndex: null,
    showDeleteModal: false
  }
  
  handleClick = (e) => {
    e.stopPropagation()
    this.setState({open: true, anchorEl: e.currentTarget})
  }
  
  handleRequestClose = (e) => {
    e.stopPropagation()
    this.setState({open: false})
    this.props.showPostEditView(false)
  }
  
  selectMenuItem = (e, index) => {
    const {location, showPostEditView, deletePost, content, currentCategory} = this.props
    this.setState({open: false, selectedIndex: index})
    console.log(content)
  
    switch (index) {
      case 0:
        showPostEditView(true)
        break
      case 1:
        if (window.confirm("Do you really want to delete post?")) {
          deletePost(content.id, currentCategory, content.parentId)
          break
        }
    }
  }
  
  render () {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <IconButton
          aria-label="More"
          aria-owns={this.state.open ? 'long-utils' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon/>
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4,
              width: 100,
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={option}
                      onClick={e => this.selectMenuItem(e, index)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
  
    )
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.routerReducer.location,
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab,
    post: state.posts.activePost.post,
  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
 
  }
}

PostSettingButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PostSettingButton))


