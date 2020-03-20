import React from 'react'
import PropTypes from 'prop-types'

export default class Card extends React.Component {
  render() {
    const { header, subheader, avatar, name, href } = this.props
    return (
      <div className='card bg-light'>
      <h4 className='header-lg center-text'>
        {header}
      </h4>
      <img class='avatar' src={avatar} alt={`Avatart for ${name}`}/>
      {subheader && (
        <h4 class='center-text'>Score: {winner.score}</h4>
      )}
      <h2 className="center-text">
        <a className="link" href={href}>{name}</a>
      </h2>
    </div>
    )
  }
} 

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}