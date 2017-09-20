import React from 'react'
import MainContent from '../Component/MainContent'
import CopyrightBar from '../Component/CopyrightBar'
import HeaderBar from '../Header/HeaderBar'

const HomePage = (props) => {
  return (
    <div>
      <HeaderBar/>
      <MainContent />
      <CopyrightBar />
    </div>
  );
}

export default HomePage