import React from 'react'
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

export default class Battle extends React.Component {
  render() {
    return(
      <React.Fragment>
        <Instruction />
      </React.Fragment>
    )
  }
}