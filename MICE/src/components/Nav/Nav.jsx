import React from 'react'
import Glyph from '@/components/Glyph'
import './Nav.css'

class Nav extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <Glyph type="logo" />
        </nav>
      </React.Fragment>
    )
  }
}

export default Nav
