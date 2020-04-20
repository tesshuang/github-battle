import React from 'react'
import PropTypes from 'prop-types'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import Result from './Result'
import ThemeContext from '../context/theme'
import { Link } from 'react-router-dom'

function Instruction() {
  const { theme } = React.useContext(ThemeContext)

  return (
    <div className='instruction-container'>
      <h1 className='center-text header-lg'>Instruction</h1>
      <ol className='container-sm center-text grid battle-instruction'>
        <li>
            <h4 className='header-md'>Enter two Github User</h4>
            <FaUserFriends className={`bg-${theme}`} color='orange' size={100} />
        </li>
        <li>
            <h4 className='header-md'>Battle</h4>
            <FaFighterJet className={`bg-${theme}`} color='grey' size={100} />
        </li>
        <li>
            <h4 className='header-md'>See the Winner</h4>
            <FaTrophy className={`bg-${theme}`} color='yellow' size={100} />
        </li>
      </ol>
    </div>

  )
}

function PlayerInput ({ onSubmit, lable }) {
  const [username, setUsername] = React.useState('')
  const { theme } = React.useContext(ThemeContext)

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit(username);
  }

  const handleChange = (e) => setUsername(e.target.value)

  return(
    <form className="column player" onSubmit={handleSubmit}>
      <label className='player-lable' htmlFor='username'>
        {lable}
      </label>
      <div className="row">
        <input 
          type='text'
          id='username'
          className={`player-input input-${theme}`}
          placeholder='Github user'
          onChange={handleChange}
        />
        <button
          className={`btn ${theme === 'light' ? 'dark-btn' : 'light-btn'}`}
          type='submit'
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  )
}


PlayerInput.propTypes = {
  lable: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
} 

function PlayerReview({ username, lable, onReset}) {
  return(
    <div className='player column'>
      <h3 className='player-lable'>{lable}</h3>
      <div className='player-info row'>
        <img 
          className='avatar-small' 
          src={`https://github.com/${username}.png?size=200`} 
          alt={`Avatar for ${username}`} />
        <h4>{username}</h4>
        <FaTimesCircle color='red' size={25} onClick={onReset}/>
      </div>
      
    </div>
  )
}

PlayerReview.propTypes = {
  username: PropTypes.string.isRequired,
  lable: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player
    })
  }

  handleReset(id) {
    this.setState({
      [id]: null
    })
  }

  render() {
    const { playerOne, playerTwo } = this.state

    return(
      <React.Fragment>
        <Instruction />
        <div className='player-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {!playerOne ?
              <PlayerInput 
                lable='Player One' 
                onSubmit={(player)=>this.handleSubmit('playerOne', player)}/>
              : <PlayerReview 
                  username={this.state.playerOne}
                  lable='Player One'
                  onReset={()=> this.handleReset('playerOne')}/>
            }
            {!playerTwo ? 
              <PlayerInput 
                lable='Player Two' 
                onSubmit={(player)=>this.handleSubmit('playerTwo', player)}/>
                : <PlayerReview 
                  username={this.state.playerTwo}
                  lable='Player Two'
                  onReset={()=> this.handleReset('playerTwo')} />
            }
          </div>
          {playerOne && playerTwo && (
              <Link 
                className='btn dark-btn container-sm'
                to={{
                  pathname: '/battle/result',
                  search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
                }}>
                Battle
              </Link>
            )}
        </div>
      </React.Fragment>
    )
  }
}