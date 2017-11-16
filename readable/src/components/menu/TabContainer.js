import React from 'react'
import {withStyles} from 'material-ui/styles'
import {connect} from 'react-redux'
import Tabs, {Tab} from 'material-ui/Tabs'
import {sortPosts} from '../../modules/actions/posts'
import {changeTab} from '../../modules/actions/menu'

const styles = theme => (
    {
      root: {
        flexGrow: 1, backgroundColor: theme.palette.background.A300,
        boxShadow: 'none', paddingLeft: theme.spacing.unit * 3
      }
    }
)

class TabContainer extends React.Component {
  state = {
    value: 0
  }

  handleClick(e, index, name) {
    e.stopPropagation()
    this.setState({value: index})
    this.props.changeTab(name)
    return this.props.sortOrderPost(name, this.props.postList)
  }

  render() {
    const {classes, currentCategory, currentTab, tabs} = this.props
    return (
        tabs && <Tabs className={ classes.root } value={ this.state.value }
                      indicatorColor="primary"
                      textColor="primary"
        >
          { tabs.map((
              ({name, path}, index) => (
                  <Tab
                      key={ name }
                      label={ name }
                      value={ index }
                      onClick={ (e) => this.handleClick(e, index, name) }
                  />
              )
          )) }
        </Tabs>
    )
  }
}

TabContainer.propTypes = {}

const mapStateToProps = (state) => {
  return {
    postList: state.posts.postList.posts,
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab,
    categories: state.categories,
    tabs: state.tabs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortOrderPost: (option, posts) => dispatch(sortPosts(option, posts)),
    changeTab: (tab) => dispatch(changeTab(tab))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(TabContainer))
