import React, { Children } from 'react'
import Home from '~/pages/Home'
import Sidebar from './Sidebar'

function DefaultLayout({children}) {
  return (
      <div>
          <Home />
          <div className="container">
              <Sidebar />
              <div className="content">{ children}</div>
          </div>
    </div>
  )
}

export default DefaultLayout