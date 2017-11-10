import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Button } from 'material-ui'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setupMenu } from '../../modules/actions/menu'
import { getPostLists } from '../../modules/actions/posts'
import { styles } from '../../styles/container/CategoryContainer'

const CategoryContainer = (props) => {
  
  const {classes, categories, currentCategory, currentTab} = props
  return (
    categories && <div className='category_grp'>
      {categories.map(({name, path}) => (
        <Button
          key={path}
          component={Link}
          to={{
            pathname: `/category/${path}=${currentTab}`,
            state: {category: name, tab: currentTab},
          }}
          className={currentCategory === name ? classes.active : ''}
          classes={{
            root: classes.root, label: classes.label,
          }}
          value={name}
        >{name}
        </Button>
      ))}
    </div>)
}

CategoryContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (globalState) => {
  return {
    currentCategory: globalState.currentMenu.category,
    currentTab: globalState.currentMenu.tab, categories: globalState.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (category) => new Promise(
      (res) => dispatch(getPostLists(category))),
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(CategoryContainer)))

