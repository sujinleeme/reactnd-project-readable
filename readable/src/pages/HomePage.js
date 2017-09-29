import React from 'react'
import PropTypes from 'prop-types'
import MainContent from '../components/MainContent'
import CopyrightBar from '../components/CopyrightBar'
import HeaderBar from '../Header/HeaderBar'

class HomePage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }
  
  componentDidMount() {
    const props = this.props;
  }
  render () {
    console.log(this.props.store)
    return (
      <div>
        <HeaderBar/>
        <MainContent/>
        <CopyrightBar/>
      </div>
    )
  }
  
}

HomePage.propTypes = {}

export default HomePage
