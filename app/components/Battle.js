import React from 'react'
import PropsType from 'prop-types'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'

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
    this.props.onSubmit(this.state.value);
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
         {this.props.label}
        </label>
        <div>
          <input 
            type='text'
            id='username'
            className='player-input'
            value={this.state.value}
            placeholder='Github user'
            onChange={this.handleChange}
          />
          <button
            className='btn btn-dark'
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

PlayerInput.propsType = {
  label: PropsType.string.isRequired,
  onSubmit: PropsType.func.isRequired
} 

export default class Battle extends React.Component {
  render() {
    return(
      <React.Fragment>
        <Instruction />
        <PlayerInput label='Label' onSubmit={()=>{}}/>
      </React.Fragment>
    )
  }
}