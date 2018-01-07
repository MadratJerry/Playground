import React from 'react'
import styles from './Glyph.css'

class Glyph extends React.Component {
  render() {
    const props = this.props
    return <i className={`${styles.glyph} ${styles[props.type]}`} />
  }
}

export default Glyph
