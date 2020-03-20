import React from 'react'
import { battle } from '../utils/api'

export default class Result extends React.Component {

  componentDidMount(){
    const { playerOne, playerTwo } = this.props

    battle([ playerOne, playerTwo])
      .then((player) => {
        console.log('data: ', player)
      })
  }
  render() {
    return(
      <div className='container'>
        <h3 className='header-lg center-text'>Result</h3>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    )
  }
}