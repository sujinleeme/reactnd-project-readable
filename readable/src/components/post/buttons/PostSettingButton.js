import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'

const options = [
  'EDIT', 'DELETE'
]

const ITEM_HEIGHT = 48

class PostSettingButton extends React.Component {
  state = {
    anchorEl: null, open: false, selectedIndex: null, showDeleteModal: false
  }

  handleClick = (e) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({open: true, anchorEl: e.currentTarget})
  }

  handleRequestClose = (e) => {
    e.stopPropagation()
    this.setState({open: false})
    this.props.showPostEditView(false)
  }

  selectMenuItem = (e, index) => {
    const {showPostEditView, deletePost, content} = this.props
    const currentCategory = content.category
    this.setState({open: false, selectedIndex: index})
    switch (index) {
      default:
      case 0:
        showPostEditView(true)
        break
      case 1:
        if (window.confirm('Do you really want to delete post?')) {
          deletePost(content.id, currentCategory, content.parentId)
          break
        }
    }
  }

  render () {
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={ this.state.open ? 'long-utils' : null }
          aria-haspopup="true"
          onClick={ this.handleClick }
        >
          <MoreVertIcon/>
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={ this.state.anchorEl }
          open={ this.state.open }
          onRequestClose={ this.handleRequestClose }
          PaperProps={ {
            style: {
              maxHeight: ITEM_HEIGHT * 4, width: 100
            }
          } }
        >
          { options.map((option, index) => (
            <MenuItem key={ option }
                      onClick={ e => this.selectMenuItem(e, index) }>
              { option }
            </MenuItem>
          )) }
        </Menu>
      </div>
    )
  }
}

export default PostSettingButton


