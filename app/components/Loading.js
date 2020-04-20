import React from 'react'
import PropTypes from 'prop-types'

export default function Loading ({ text = 'Loading', speed = 300 }) {
  const [content, setContent ] = React.useState(text)

  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (content === `${content}....`) {
        setContent(text)
      }
      setContent((c) => `${c}.`)
    }, speed)
    return () => window.clearInterval(id)
  }, [text, speed])

  const style = {
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: '700'
  }
  return(
    <p style={style}>{content}</p>
  )
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
}