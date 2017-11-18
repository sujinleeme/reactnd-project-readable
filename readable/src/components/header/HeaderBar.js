import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import CategoryContainer from '../menu/CategoryContainer'
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'
import { styles } from '../../styles/header/HeaderBar'


const HeaderBar = (props) => {
  const classes = props.classes
  return (
    <div className={ classes.root }>
      <Grid container spacing={ 0 }>
        <AppBar position="static" color="inherit">
          <Toolbar classes={ {
            root: classes.root
          } }>
            <Grid item md={ 3 }/>
            <Grid item md={ 7 } container={ true } direction="column">
              <div className={ classes.header }>
                <div className={ classes.typoLogo }>
                  <Typography type="headline" color="inherit"
                              className="main">
                    <Link to={ {
                      pathname: `/`, state: {
                        category: 'all'
                      }
                    } }>
                      #TalkAboutReact
                    </Link>
                  </Typography>
                  <Typography type="headline" color="accent"
                              className={ classes.detailTypoLogo }>
                    / Student Discussion Board
                  </Typography>
                </div>
                <CategoryContainer/>
              </div>
            </Grid>
            <Grid item md={ 3 }/>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  )
}
HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired
}
export default styles(HeaderBar)
