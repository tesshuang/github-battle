import React from 'react'
import { FaUserFriend, FaFighterJet, FaTrophy } from 'react-icons'

function Instruction() {
  return (
    <div className='instruction-container'>
      <h1 className='center-text header-lg'>Instruction</h1>
      <ol className='container-sm center-text grid battle-instruction'>
        <li>
            <h4 className='header-md'>Enter two Github User</h4>
            <FaUserFriend color='orange' size={100} />
        </li>
        <li>
            <h4 className='header-md'>Battle</h4>
            <FaFighterJet color='grey' size={100} />
        </li>
        <li>
            <h4 className='header-md'>Winner</h4>
            <FaTrophy color='yellow' size={100} />
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