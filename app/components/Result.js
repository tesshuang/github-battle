import React from 'react'
import { battle } from '../utils/api'
import { FaUsers, FaCompass, FaBriefcase, FaUserFriends, FaCode, FaUser } from "react-icons/fa"

export default class Result extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null, 
      error: null,
      loading: true
    }
  }
  componentDidMount(){
    const { playerOne, playerTwo } = this.props

    battle([ playerOne, playerTwo])
      .then((player) => {
        console.log('data: ', player)
        this.setState({
          loading: false,
          winner: player[0],
          loser: player[1],
          error:null
        })
      }).catch(({ message }) => {
        this.setState({
          error: message,
          loading: fales
        })
      })
  }
  render() {
    const { loading, winner, loser } = this.state
    // const { name, avatar_url, login, followers, html_url } = winner
    if(loading) {
      return <p className="header-lg">Loading</p>
    }
    return(
      <div >
        <h3 className='header-lg center-text'>Result</h3>
        <div className='grid space-around'>
        <div className='card bg-light'>
          <h4 className='header-lg center-text'>
            {winner.score === loser.score ? 'Tie' : 'Winner'}
          </h4>
          <img class='avatar' src={winner.profile.avatar_url} alt={`Avatart for ${winner.profile.login}`}/>
          <h4 class='center-text'>Score: {winner.score}</h4>
          <h2 className="center-text">
            <a className="link" href={winner.profile.html_url}>{winner.profile.name}</a>
          </h2>
          <ul className="card-list">
            <li>
              <FaUser color="orange" size={22} />
                {winner.profile.name}
            </li>
            { winner.profile.location && (
              <li>
                <FaCompass color='salmon' size={22} />
                {winner.profile.location}
              </li>
            )}
            { winner.profile.company && (
              <li>
                <FaBriefcase color='brown' size={22} />
                {winner.profile.company}
              </li>
            )}
            <li>
              <FaUsers color="yellow" size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="pink" size={22} />
              {winner.profile.following.toLocaleString()} followings
            </li>
          </ul>
        </div>
        <div className='card bg-light'>
          <h4 className='header-lg center-text'>
            {loser.score === loser.score ? 'Tie' : 'Loser'}
          </h4>
          <img class='avatar' src={loser.profile.avatar_url} alt={`Avatart for ${loser.profile.login}`}/>
          <h4 class='center-text'>Score: {loser.score}</h4>
          <h2 className="center-text">
            <a className="link" href={loser.profile.html_url}>{loser.profile.name}</a>
          </h2>
          <ul className="card-list">
            <li>
              <FaUser color="orange" size={22} />
                {loser.profile.name}
            </li>
            { loser.profile.location && (
              <li>
                <FaCompass color='salmon' size={22} />
                {loser.profile.location}
              </li>
            )}
            { loser.profile.company && (
              <li>
                <FaBriefcase color='brown' size={22} />
                {loser.profile.company}
              </li>
            )}
            <li>
              <FaUsers color="yellow" size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="pink" size={22} />
              {loser.profile.following.toLocaleString()} followings
            </li>
          </ul>
        </div>
        </div>
      </div>
    )
  }
}