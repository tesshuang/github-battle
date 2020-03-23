import React from 'react'
import PropTypes from 'prop-types'
import { battle } from '../utils/api'
import { FaUsers, FaCompass, FaBriefcase, FaUserFriends, FaCode, FaUser } from "react-icons/fa"
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

function ProfileList ({profile}) {
  return (
    <ul className="card-list">
    <li>
      <FaUser color="orange" size={22} />
        {profile.name}
    </li>
    { profile.location && (
      <li>
        <Tooltip text='User location'>
          <FaCompass color='salmon' size={22} />
          {profile.location}
        </Tooltip>
      </li>
    )}
    { profile.company && (
      <li>
        <Tooltip text='User Company'>
          <FaBriefcase color='brown' size={22} />
          {profile.company}
        </Tooltip>
      </li>
    )}
    <li>
      <FaUsers color="yellow" size={22} />
      {profile.followers.toLocaleString()} followers
    </li>
    <li>
      <FaUserFriends color="pink" size={22} />
      {profile.following.toLocaleString()} followings
    </li>
  </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}
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
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search)

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
          loading: false
        })
      })
  }
  render() {
    const { loading, winner, loser } = this.state
    // const { name, avatar_url, login, followers, html_url } = winner
    if(loading) {
      return <Loading />
    }
    return(
      <React.Fragment>
        <div className='grid space-around'>
          <Card 
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score}`}
            avatar={winner.profile.avatar_url}
            name={winner.profile.login}
            href={winner.profile.html_url}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score}`}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            href={loser.profile.html_url}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link 
          className='btn dark-btn container-sm' 
          to='/battle'>
            Reset
          </Link>
      </React.Fragment>

    )
  }
}