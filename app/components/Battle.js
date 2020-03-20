import React from 'react'
import PropTypes from 'prop-types'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import Result from './Result'

function Instruction() {
  return (
    <div className='instruction-container'>
      <h1 className='center-text header-lg'>Instruction</h1>
      <ol className='container-sm center-text grid battle-instruction'>
        <li>
            <h4 className='header-md'>Enter two Github User</h4>
            <FaUserFriends className='bg-light' color='orange' size={100} />
        </li>
        <li>
            <h4 className='header-md'>Battle</h4>
            <FaFighterJet className='bg-light' color='grey' size={100} />
        </li>
        <li>
            <h4 className='header-md'>See the Winner</h4>
            <FaTrophy className='bg-light' color='yellow' size={100} />
        </li>
      </ol>
    </div>
  )
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.onSubmit(this.state.username);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    })
  }
  render() {
    return(
      <form className="column player" onSubmit={this.handleSubmit}>
        <label className='player-lable' htmlFor='username'>
         {this.props.lable}
        </label>
        <div className="row">
          <input 
            type='text'
            id='username'
            className='player-input'
            value={this.state.value}
            placeholder='Github user'
            onChange={this.handleChange}
          />
          <button
            className='btn dark-btn'
            type='submit'
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
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
      show: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    // this.showResult = this.showResult.bind(this)
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

  // showResult() {
  //   this.setState({
  //     show: true
  //   })
  // }

  render() {
    const { playerOne, playerTwo, show } = this.state

    if (show) {
      return(
        <Result playerOne={playerOne} playerTwo={playerTwo}/>
      )
    }
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
              <button 
                className='btn dark-btn container-sm'
                onClick={() => this.setState({ show: true })}>
                Battle
              </button>
            )}
        </div>
      </React.Fragment>
    )
  }
}