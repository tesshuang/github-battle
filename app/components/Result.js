import React from 'react'

export default class Result extends React.Component {
  render() {
    return(
      <div className='container'>
        <h3 className='header-lg center-text'>Result</h3>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    )
  }
}