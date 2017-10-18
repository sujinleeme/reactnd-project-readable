import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { withStyles } from 'material-ui/styles'

import { changeEditView } from '../modules/menu/actions/menu'
import { connect } from 'react-redux'

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

class PostMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    selectedIndex: null,
  }
  
  handleClick = (e) => {
    e.stopPropagation()
    this.setState({open: true, anchorEl: e.currentTarget})
  }
  
  handleRequestClose = (e) => {
    e.stopPropagation()
    this.setState({open: false})
    this.props.changeEditView(false)
  }
  
  selectMenuItem = (e, index) => {
    this.setState({open: false, selectedIndex: index})
    switch (index) {
      case 0:
        this.props.changeEditView(true)
        break
      case 1:
    }
  }
  
  render () {
    const classes = this.props.classes
  
    return (
      <div className={classes.root}>
        <IconButton
          aria-label="More"
          aria-owns={this.state.open ? 'long-menu' : null}
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    // changeEditView: (bool) => dispatch(changeEditView(bool)),
  }
}

PostMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PostMenu))


