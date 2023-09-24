import React from 'react'
import Navbar from '../../components/Navbar.jsx'

const layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default layout