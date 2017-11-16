import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {Button} from 'material-ui'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {styles} from '../../styles/container/CategoryContainer'

class CategoryContainer extends React.Component {

  render() {
    const {classes, categories, currentCategory, currentTab} = this.props
    return (
        categories && <div className='category_grp'>
          { categories.map(({name, path}) => (
              <Button
                  key={ path }
                  component={ Link }
                  to={ {
                    pathname: `/category/${path}`,
                    state: {category: name, tab: currentTab}
                  } }
                  className={ currentCategory === name ? classes.active : '' }
                  classes={ {
                    root: classes.root, label: classes.label
                  } }
                  value={ name }
                  onClick={ (e) => this.handelClick(e, name) }

              >{ name }
              </Button>
          )) }
        </div>
    )
  }

}

CategoryContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(CategoryContainer))

