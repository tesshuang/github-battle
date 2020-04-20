import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  }
}
function useHover() {
  const [hover, setHover] = React.useState(false)

  const mouseOver = () => setHover(true)
  const mouseOut = () => setHover(false)

  const attr = {
    onMouseOut: mouseOut,
    onMouseOver: mouseOver
  }

  return [hover, attr]
}

export default function Tooltip({text, children}) {
  const [hover, attr] = useHover()
  return (
    <div style={styles.container} {...attr}>
      {hover === true && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>

  )
}

Tooltip.propTypes ={
  text: PropTypes.string.isRequired
}