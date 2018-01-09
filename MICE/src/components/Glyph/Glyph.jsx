import React from 'react'
import styles from './Glyph.css'

class Glyph extends React.Component {
  render() {
    const { props } = this
    return (
      <span
        className={`${styles.glyph} ${styles[props.type]}`}
        style={{ fontSize: props.size + 'px', color: props.color }}
      />
    )
  }
}

export default Glyph
